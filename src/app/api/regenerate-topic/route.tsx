// api/regenerate-topic.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../../../configs/db";
import { eq } from "drizzle-orm";
import { coursesTable } from "../../../../configs/schema";

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

function safeParseJSON(str: string) {
    try {
        const cleaned = str.replace(/```json/gi, "").replace(/```/g, "").replace(/[\u0000-\u001F]+/g, "").trim();
        return JSON.parse(cleaned);
    } catch {
        return null;
    }
}

async function generateTopic(model: any, chapterName: string, topic: string) {

    const input = `
${TOPIC_PROMPT}
${JSON.stringify({ chapterName, topic }, null, 0)}
`;

    let result;
    try {
        result = await model.generateContent(input);
    } catch (e: any) {
        return NextResponse.json(
            {
                error: "Gemini API error",
                message: "Проблема с Gemini API ключом или превышен лимит запросов"
            },
            { status: 503 }
        );
    }

    const raw = result.response.text();
    const parsed = safeParseJSON(raw);

    if (!parsed?.content) throw new Error("Invalid topic JSON");

    return parsed.content;
}

export async function POST(req: NextRequest) {
    try {
        const { courseId, chapterIndex, topicIndex, apiKey } = await req.json();

        const course = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId))

        if (!course[0]) return NextResponse.json({ error: "COURSE_NOT_FOUND" }, { status: 404 });

        const chapter = course[0].courseContent[chapterIndex];
        const topicName = chapter.courseData.topics[topicIndex].topic;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const newContent = await generateTopic(model, chapter.courseData.chapterName, topicName);


        chapter.courseData.topics[topicIndex].content = newContent;

        await db.update(coursesTable)
            .set({ courseContent: course[0].courseContent })
            .where(eq(coursesTable.cid, courseId));

        return NextResponse.json({ success: true, newContent });
    } catch (err: any) {
        console.error("❌ regenerate-topic error:", err);
        return NextResponse.json({ error: err.message || "Failed" }, { status: 500 });
    }
}
