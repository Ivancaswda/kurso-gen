import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../../../configs/db";
import { coursesTable } from "../../../../configs/schema";
import { eq } from "drizzle-orm";



export async function POST(req: NextRequest) {
    try {
        const { courseId, groupIndex, chapterIndex } = await req.json();

        const courses = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId)).execute();

        if (!courses || courses.length === 0) {
            return NextResponse.json({ error: "Курс не найден" }, { status: 404 });
        }
        console.log('course===', courses[0])

        const course = courses[0];

        const chapter = course.courseContent[groupIndex];

        const genAI = new GoogleGenerativeAI(course.apiKey);
        const prompt = `
Ты — генератор практических заданий для студентов.

Сгенерируй список быстрых вопросов для главы "${chapter.chapterName}".
Используй темы: ${chapter.courseData.topics.map((t: any) => t.topic).join(", ")}.

Формат ответа строго JSON:
{
  "questions": [
    {
      "question": "Что делает цикл for?",
      "type": "short_answer", // short_answer | boolean | code
      "correctAnswer": "Повторяет код несколько раз"
    },
    {
      "question": "JavaScript — это строго типизированный язык?",
      "type": "boolean",
      "correctAnswer": "Нет"
    },
    {
      "question": "Что выведет console.log(2+2)?",
      "type": "code",
      "correctAnswer": "4"
    }
  ]
}

❗ Важно:
- Возвращай только JSON, без текста до или после.
- Обязательно минимум 3 вопроса.
- Типы вопросов: short_answer, boolean, code.
- "correctAnswer" должен быть коротким и точным.
`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
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
        let rawResp = result.response.text();

        rawResp = rawResp
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const firstBrace = rawResp.indexOf("{");
        const lastBrace = rawResp.lastIndexOf("}");
        if (firstBrace === -1 || lastBrace === -1) {
            throw new Error("AI вернул некорректный JSON");
        }

        const jsonString = rawResp.substring(firstBrace, lastBrace + 1);
        const parsed = JSON.parse(jsonString);

        const updatedCourseContent = course.courseContent.map((ch, gIndex) => {
            if (gIndex !== groupIndex) return ch;
            return { ...ch, homework: parsed };
        });

        await db.update(coursesTable)
            .set({ courseContent: updatedCourseContent })
            .where(eq(coursesTable.cid, courseId));

        return NextResponse.json({ homework: parsed });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Ошибка генерации домашнего задания" }, { status: 500 });
    }
}
