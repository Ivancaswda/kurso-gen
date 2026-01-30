// src/app/api/generate-save-practice-task/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../../../configs/db";
import { coursesTable } from "../../../../configs/schema";
import { eq } from "drizzle-orm";



export async function POST(req: NextRequest) {
    try {
        const { courseId, groupIndex, chapterIndex } = await req.json();

        // 1. Достаём курс из БД
        const courses = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.cid, courseId))
            .execute();

        if (!courses || courses.length === 0) {
            return NextResponse.json({ error: "Курс не найден" }, { status: 404 });
        }

        const course = courses[0].courseJson?.course;
        console.log('course===')
        console.log(courses[0])
        const genAI = new GoogleGenerativeAI(courses[0].apiKey);



        const chapter = course.chapters?.[groupIndex] || course.chapters[groupIndex].topics[chapterIndex];


        const prompt = `
Ты преподаватель. Сгенерируй практическое задание по теме "${chapter.chapterName}" 
для языка ${course.name}. 

Формат JSON:
{
  "question": "Напишите функцию reverseString, которая переворачивает строку",
  "language": "${course.name}",
  "starterCode": "function reverseString(str: string): string {\n  // ваш код\n}",
  "tests": [
    { "input": ["hello"], "expected": "olleh" },
    { "input": ["typescript"], "expected": "tpircsetypT" }
  ],
  "timeLimit": 30 (не меньше 30)
}

Важно:
- Используй именно ${course.name} как язык программирования.
- Верни только JSON, без Markdown и текста вокруг.
    `;


        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        let result;
        try {
            result = await model.generateContent(prompt);
        } catch (e: any) {
            return NextResponse.json(
                {
                    error: "Gemini API error",
                    message: "Проблема с Gemini API ключом или превышен лимит запросов"
                },
                { status: 503 }
            );
        }

        const rawResp = result.response.text()?.trim();

        if (!rawResp) {
            throw new Error("Gemini вернул пустой ответ");
        }

        const firstBrace = rawResp.indexOf("{");
        const lastBrace = rawResp.lastIndexOf("}");

        if (firstBrace === -1 || lastBrace === -1) {
            console.error("RAW GEMINI RESPONSE:", rawResp);
            throw new Error("Ответ Gemini не содержит JSON");
        }

        const jsonString = rawResp.substring(firstBrace, lastBrace + 1);

        let practice;
        try {
            practice = JSON.parse(jsonString);
        } catch (e) {
            console.error("JSON STRING:", jsonString);
            throw new Error("Ошибка парсинга JSON от Gemini");
        }




        return NextResponse.json(practice);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Ошибка генерации практики" }, { status: 500 });
    }
}
