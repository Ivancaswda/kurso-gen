import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
    try {
        const { userAnswer, correctAnswer, type } = await req.json();

        let verdict = false;
        let aiError: string | null = null;

        if (type === "boolean" || type === "short_answer") {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                const checkPrompt = `
                  Сравни ответ студента: "${userAnswer}" и правильный ответ: "${correctAnswer}".
                  Верни "true", если ответ правильный (по смыслу), иначе "false".
                `;
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
                verdict = result.response.text().toLowerCase().includes("true");
            } catch (error: any) {
                console.error("Ошибка AI проверки:", error);
                aiError = "Сервис проверки временно недоступен";
            }
        } else if (type === "code") {
            verdict = userAnswer.trim() === correctAnswer.trim();
        }

        return NextResponse.json({ correct: verdict, aiError });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Ошибка проверки" }, { status: 500 });
    }
}
