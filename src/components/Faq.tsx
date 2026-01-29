'use client'
import { motion } from "framer-motion"

const FAQ = () => {
    const faqs = [
        {
            q: "Нужны ли знания для начала обучения?",
            a: "Нет. Просто опиши, чему хочешь научиться — КурсоГен сам сгенерирует полный учебный курс."
        },
        {
            q: "Что входит в курс?",
            a: "Видео-рекомендации, теоретический материал, интерактивные задания, раздаточные материалы и домашние задания."
        },
        {
            q: "Можно ли редактировать курс?",
            a: "Да. Ты можешь менять структуру курса, темы, задания и пересоздавать контент в любое время."
        },
        {
            q: "Подходит ли КурсоГен для новичков?",
            a: "Да. Уровень сложности подбирается автоматически — от новичка до продвинутого."
        },
        {
            q: "Это бесплатно?",
            a: "Генерация курсов использует ИИ-ресурсы. Для создания контента используются звёзды, которые можно приобрести на странице тарифов."
        }
    ]
    return (
        <section id='faq' className="max-w-4xl mx-auto py-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
                Частые вопросы
            </h2>

            <div className="space-y-6">
                {faqs.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl border bg-sidebar/50 dark:bg-sidebar/70 backdrop-blur-md"
                    >
                        <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
                        <p className="text-muted-foreground">{item.a}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default FAQ
