// api/generate-course-content
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../../../configs/db";
import { eq } from "drizzle-orm";
import { coursesTable } from "../../../../configs/schema";
import axios from "axios";

const PROMPT = `
Ты — профессиональный автор онлайн-курсов и технический писатель.

Ты должен отвечать СТРОГО в формате JSON.
Никакого текста вне JSON. Никаких пояснений.

ФОРМАТ ОТВЕТА:

{
  "chapterName": "<название главы>",
  "topics": [
    {
      "topic": "<название темы>",
      "content": "<HTML-контент>"
    }
  ]
}

ОБЯЗАТЕЛЬНЫЕ ТРЕБОВАНИЯ К HTML-КОНТЕНТУ:

- Используй ТОЛЬКО HTML (никакого markdown)
- Структурируй контент, он НЕ ДОЛЖЕН быть сплошным текстом
- ВНУТРИ content обязательно используй:
  - <h3> для логических разделов
  - <h4> для подпунктов
  - <p> для обычного текста
  - <ul><li> для перечислений
  - <pre><code> для примеров кода
- Минимум 4–6 логических секций (<h3>) на тему
- Каждый <h3> должен сопровождаться поясняющим текстом
- Если уместно — добавляй примеры кода
- Контент должен читаться как урок в современном онлайн-курсе
- Никаких <html>, <body>, <head>
- Никаких inline-стилей
- Никаких комментариев

ДОПОЛНИТЕЛЬНЫЕ ТРЕБОВАНИЯ К HTML:

- ВЕСЬ контент темы должен быть обёрнут в <section class="lesson">
- Каждый логический блок оформляй как:
  <section class="lesson-block">
- Используй специальные semantic-блоки:
  - <div class="lesson-callout"> — важные пояснения
  - <div class="lesson-example"> — примеры
  - <div class="lesson-tip"> — советы
  - <div class="lesson-summary"> — итог темы
- Заголовки:
  - <h3 class="lesson-title">
  - <h4 class="lesson-subtitle">
- Списки и код использовать ТОЛЬКО внутри блоков

ЕСЛИ ТЕМА СЛОЖНАЯ:
— разбивай её на подчасти
— сначала объяснение, потом пример, потом вывод

ЕСЛИ НЕ МОЖЕШЬ СГЕНЕРИРОВАТЬ:
— верни content с краткой HTML-заглушкой

User Input:
`;
const TOPIC_PROMPT = `
Ты — профессиональный автор онлайн-курсов и технический писатель.
Ты должен отвечать СТРОГО в формате JSON.
Никакого текста вне JSON.

ФОРМАТ:

{
  "topic": "<название темы>",
  "content": "<HTML-контент>"
}

ТРЕБОВАНИЯ К HTML:
- ТОЛЬКО HTML
- <section class="lesson"> вокруг всей темы
- <section class="lesson-block"> для каждого блока
- <h3 class="lesson-title"> для основных разделов
- <h4 class="lesson-subtitle"> для подпунктов
- <div class="lesson-callout"> — важные пояснения
- <div class="lesson-example"> — примеры
- <div class="lesson-tip"> — советы
- <div class="lesson-summary"> — итог темы
- <p>, <ul><li>, <pre><code> внутри блоков
- Минимум 4–6 секций <h3>
- НЕ markdown
- Без inline-стилей
- Без комментариев

User Input:
`;

async function runWithLimit(tasks: (() => Promise<any>)[], limit = 2) {
    const results: any[] = [];
    const executing: Promise<any>[] = [];

    for (const task of tasks) {
        const p = task().then(res => {
            executing.splice(executing.indexOf(p), 1);
            return res;
        });

        results.push(p);
        executing.push(p);

        if (executing.length >= limit) {
            await Promise.race(executing);
        }
    }

    return Promise.all(results);
}
async function retry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000
): Promise<T> {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 1) throw err;
        await new Promise(r => setTimeout(r, delay));
        return retry(fn, retries - 1, delay * 1.5);
    }
}

function fallbackTopic(topic: string, chapterName: string) {
    return {
        chapterName,
        topics: [
            {
                topic,
                content: `<p>Контент для темы <b>${topic}</b> временно недоступен. Вы можете перегенерировать эту тему позже.</p>`
            }
        ]
    };
}
async function generateTopic(
    model:any,
    chapterName: string,
    topic: string
) {
    return retry(async () => {
        const prompt =
            TOPIC_PROMPT +
            JSON.stringify({ chapterName, topic });

        const result = await model.generateContent(prompt);
        const raw = result.response.text();
        const parsed = safeParseJSON(raw);

        if (!parsed?.content) {
            throw new Error("Invalid topic JSON");
        }

        return {
            topic,
            content: parsed.content
        };
    }, 5);
}

export async function POST(req: NextRequest) {
    try {
        const { courseJson, courseTitle, courseId, apiKey } = await req.json();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const tasks: (() => Promise<any>)[] = [];

        for (const chapter of courseJson.chapters) {
            tasks.push(async () => {


                const topicTasks = chapter.topics.map(topic => async () => {
                    try {
                        return await generateTopic(model, chapter.chapterName, topic);
                    } catch {
                        return {
                            topic,
                            content: `<section class="lesson">
                          <section class="lesson-block">
                            <p>Контент для темы <b>${topic}</b> временно недоступен.</p>
                          </section>
                        </section>`
                        };
                    }
                });

                const topicsContent = await runWithLimit(topicTasks, 2);


                const youtubeVideo = await getYoutubeVideos(
                    chapter.chapterName
                );

                return {
                    youtubeVideo,
                    courseData: {
                        chapterName: chapter.chapterName,
                        topics: topicsContent
                    }
                };
            });
        }

        const courseContent = await runWithLimit(tasks, 2);

        await db
            .update(coursesTable)
            .set({ courseContent })
            .where(eq(coursesTable.cid, courseId));

        return NextResponse.json({
            CourseName: courseTitle,
            CourseContent: courseContent
        });
    } catch (err: any) {
        console.error("❌ generate-course-content error:", err);

        return NextResponse.json(
            {
                error: "COURSE_GENERATION_FAILED",
                message: err.message || "Неизвестная ошибка сервера"
            },
            { status: 500 }
        );
    }
}


function safeParseJSON(str: string) {
    try {
        const cleaned = str
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .replace(/[\u0000-\u001F]+/g, "")
            .trim();

        return JSON.parse(cleaned);
    } catch {
        return null;
    }
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const getYoutubeVideos = async (query: string) => {
    const params = {
        part: "snippet",
        q: query,
        maxResults: 3,
        type: "video",
        key: process.env.YOUTUBE_API_KEY,
    };

    try {
        const resp = await axios.get(YOUTUBE_BASE_URL, { params });
        return resp.data.items.map((item: any) => ({
            videoId: item.id?.videoId,
            title: item.snippet?.title,
        }));
    } catch (error) {
        console.error("❌ Error fetching YouTube videos:", error);
        return [];
    }
};
