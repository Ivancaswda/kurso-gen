// /api/ai-assistant/route.tsx

import { NextRequest, NextResponse } from "next/server";
import getServerUser from "@/lib/auth-server";
import { GoogleGenerativeAI } from "@google/generative-ai";



const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
export const PROMPT = `
Ты — КурсоСап - AI-ассистент сервиса КурсоГен.

КурсоГен — это платформа для онлайн-обучения и генерации курсов с ИИ.
Он позволяет:
- создавать и проходить курсы по различным темам
- делать домашние задания и практические задачи
- давать раздаточный материал для повторения пройденного урока
- отслеживать прогресс и достижения
- рекомендовать самые популярные курсы


Твоя задача:
- отвечать на вопросы пользователей о КурсоГен
- рекомендовать самые популярные курсы - на момент февраля 2026 года это языки программирования - Python, Javascript, Java, C#, C++
- помогать разобраться с функциональностью платформы
- Отвечать если напрмер не генерирует например уроки - выдает ошибку - то отвечать что скорее всего вам нужно поменять gemini api key или приобрести звезды
- давать советы по прохождению курсов и домашним заданиям
- быть дружелюбным, понятным и кратким
- связать с поддержкой можно нажав кнопку снизу или написать на почту kursogen@gmail.com
- номер телефона владельца 8-952-163-71-68 (Иван)
- компания была создана  летом в 2025 году
- в курс входит Видео-рекомендации, теоретический материал, интерактивные задания, раздаточные материалы и домашние задания.
- если вопрос не по теме — мягко возвращать к КурсоГен и возможностям обучения
- (1 звезда - один урок можно сгенерировать) 5 звезд стоит 500 рублей, 10 звезд - 900 рублей, 15 звезд - 1400 рублей и 20 звезд - 1700 рублей

Отвечай на русском языке.
`
export async function POST(req: NextRequest) {
    try {
        const { messages} = await req.json();
        const user = await getServerUser();

        if (!user) {
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });
        }

        const history = messages.map((i:any) =>
            i.role === 'assistant' ? `КурсоСап: ${i.content}` : `Пользователь: ${i.content}`
        )


        const fullPrompt = `
        ${PROMPT}
        История диалога: 
        ${history}
        Ответь пользователю: 
`;


        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(fullPrompt);
        const text = result.response.text();

        return NextResponse.json({ content: text });
    } catch (err: any) {
        console.error("❌ Ошибка в /api/ai-assistant:", err);
        return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
    }
}
