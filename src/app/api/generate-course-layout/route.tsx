import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../../../configs/db";
import {coursesTable, usersTable} from "../../../../configs/schema";
import getServerUser from "@/lib/auth-server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {eq} from "drizzle-orm";

const PROMPT = `
Сгенерируй учебный курс на основе следующих данных. 

Ответ должен строго соответствовать JSON-схеме:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": boolean,
    "noOfChapters": number,
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"],
        "imagePrompt": "string"
      }
    ]
  }
}

ОГРАНИЧЕНИЯ:
- В КАЖДОЙ главе НЕ БОЛЕЕ 4 тем (topics)
- Верни ТОЛЬКО JSON
- Без markdown
- Без комментариев
- Используй русский язык

Входные данные пользователя:
`;

function safeParseJSON(raw: string) {
    if (!raw) return null;

    const firstBrace = raw.indexOf("{");
    const lastBrace = raw.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
        console.error("❌ No JSON braces:", raw);
        return null;
    }

    try {
        return JSON.parse(raw.slice(firstBrace, lastBrace + 1));
    } catch (e) {
        console.error("❌ JSON parse error:", raw);
        return null;
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json();
        const user = await getServerUser();
        const users = await db.select().from(usersTable).where(eq(usersTable.email, user.email)).limit(1)

        const Curuser = users[0]
        if (!Curuser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        console.log(user)

        if (Number(Curuser.credits) < 1) {
            return NextResponse.json(
                {
                    error: "NO_CREDITS",
                    message: "У вас закончились кредиты. Пополните баланс."
                },
                { status: 402 }
            );
        }

        const genAI = new GoogleGenerativeAI(formData.apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const fullPrompt = PROMPT + JSON.stringify(formData);

        let result;
        try {
            result = await model.generateContent(fullPrompt);
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

        const jsonResp = safeParseJSON(raw);

        if (!jsonResp?.course) {
            console.error("❌ Invalid course JSON:", raw);
            return NextResponse.json(
                { error: "Ошибка генерации курса" },
                { status: 500 }
            );
        }


        jsonResp.course.chapters = jsonResp.course.chapters.map((ch: any) => ({
            ...ch,
            topics: Array.isArray(ch.topics) ? ch.topics.slice(0, 4) : [],
        }));

        const imagePrompt = jsonResp.course.chapters[0]?.imagePrompt;

        let bannerImageUrl: string | null = null;
        try {
            bannerImageUrl = imagePrompt
                ? await generateImage(imagePrompt)
                : null;
        } catch (e) {
            console.warn("⚠️ Banner image skipped:", e);
        }

        const cid = uuidv4();

        await db.insert(coursesTable).values({
            ...formData,
            courseJson: jsonResp,
            userEmail: Curuser.email,
            cid,
            label: jsonResp.course.name,
            bannerImageUrl,
        });
        await db
            .update(usersTable)
            .set({
                credits: (Curuser?.credits ?? 0) - 1,
            })
            .where(eq(usersTable.email, Curuser.email));
        return NextResponse.json({ courseId: cid });
    } catch (err: any) {
        console.error("❌ generate-course-layout error:", err);

        return NextResponse.json(
            {
                error: "COURSE_GENERATION_FAILED",
                message: err.message || "Неизвестная ошибка сервера"
            },
            { status: 500 }
        );
    }
}

const generateImage = async (imagePrompt: string) => {
    const result = await axios.get(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            imagePrompt
        )}&per_page=1`,
        {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        }
    );

    if (!result.data?.results?.length) {
        return null;
    }

    return result.data.results[0].urls.regular;
};
