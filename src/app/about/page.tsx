'use client'

import React, {useState} from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import {cn} from "@/lib/utils";
import {ChevronRight} from "lucide-react";
import QAItem from "@/components/QaItem";
import Footer from "@/components/Footer";
import InfiniteLogos from "@/components/InfiniteLogos";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import {PopularTopicsBarChart} from "@/components/PopularTopicBarChart";
import CompareMatWorkLineChart from "@/components/CompareMatWorkLineChart";
import {AnimatedStatsCards} from "@/components/AnimatedStatsCards";



const AboutPage = () => {
    const testimonials = [
        {
            quote:
                "КурсоГен полностью изменил мой подход к обучению. Уроки понятные, логичные и реально помогают применять знания на практике, а не просто читать теорию.",
            name: "Алексей П.",
            title: "Студент курса по Python",
        },
        {
            quote:
                "Я прошёл несколько онлайн-курсов, но именно здесь впервые почувствовал, что обучение подстраивается под меня. Искусственный интеллект объясняет сложные темы максимально доступно.",
            name: "Мария К.",
            title: "Frontend-разработчик",
        },
        {
            quote:
                "Очень понравилась структура курсов и практические задания. Домашние работы помогают закрепить материал, а прогресс видно уже через пару недель.",
            name: "Илья С.",
            title: "Начинающий JavaScript-разработчик",
        },
        {
            quote:
                "КурсоГен — отличный выбор для тех, кто хочет учиться быстро и эффективно. Особенно ценно, что курсы постоянно обновляются и соответствуют современным требованиям рынка.",
            name: "Екатерина Л.",
            title: "Product-менеджер",
        },
        {
            quote:
                "Я начал с нуля и боялся, что будет сложно. Но пошаговое обучение и поддержка платформы помогли мне уверенно войти в IT.",
            name: "Дмитрий Н.",
            title: "Студент курса по веб-разработке",
        },
    ];

    return (
        <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-orange-100 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-orange-100 to-transparent z-10" />

            {/* HERO */}
            <BackgroundGradientAnimation>
                <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-center">
                    <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/90 to-white/30 text-4xl md:text-5xl lg:text-7xl">
                        Что нужно знать о Курсогене
                    </p>
                </div>
            </BackgroundGradientAnimation>


            <section className="relative flex flex-col gap-4 z-10 max-w-3xl mx-auto px-6 py-24">
                <Image src="/logo.png" alt="logo" width={180} height={180}/>
                <QAItem
                    title="Что такое КурсоГен?"
                    content="КурсоГен — это AI-платформа для генерации учебных курсов, которая позволяет создавать структуру, контент и материалы без знаний программирования."
                />

                <QAItem
                    title="Как работают звезды?"
                    content="Звезды тратятся на генерацию курсов и контента. Один запуск генерации — один кредит."
                />

                <QAItem
                    title="Нужен ли опыт в обучении?"
                    content="Нет. КурсоГен подходит как для экспертов, так и для новичков — ИИ помогает на каждом этапе."
                />
            </section>
            <>

                <div className="max-w-4xl mx-auto px-6 py-24">
                    <h1 className="text-4xl font-bold mb-6">
                        Условия использования
                    </h1>

                    <p className="text-muted-foreground mb-8">
                        Используя сервис Websity, вы соглашаетесь с настоящими
                        условиями использования. Пожалуйста, внимательно ознакомьтесь
                        с ними.
                    </p>

                    <div className="space-y-8 text-muted-foreground">
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                1. Описание сервиса
                            </h2>
                            <p>
                                Websity — это онлайн-платформа, использующая
                                искусственный интеллект для генерации веб-сайтов,
                                пользовательских интерфейсов и связанных материалов.
                                Сервис предоставляется «как есть».
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                2. Учётные записи
                            </h2>
                            <p>
                                Вы несёте ответственность за сохранность своей
                                учётной записи и всех действий, совершаемых под ней.
                                Запрещено передавать доступ третьим лицам.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                3. Использование ИИ
                            </h2>
                            <p>
                                Сгенерированный контент создаётся автоматически
                                и может содержать неточности. Пользователь
                                самостоятельно проверяет и несёт ответственность
                                за итоговое использование материалов.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                4. Ограничения
                            </h2>
                            <p>
                                Запрещено использовать Websity для незаконной
                                деятельности, распространения вредоносного кода,
                                нарушения авторских прав и попыток взлома сервиса.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                5. Платные функции
                            </h2>
                            <p>
                                Некоторые функции могут быть доступны только
                                по подписке. Условия оплаты и возвратов
                                описываются отдельно на странице тарифов.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                6. Ограничение ответственности
                            </h2>
                            <p>
                                Websity не несёт ответственности за прямой или
                                косвенный ущерб, возникший в результате использования
                                или невозможности использования сервиса.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                7. Изменения условий
                            </h2>
                            <p>
                                Мы оставляем за собой право обновлять данные
                                условия в любое время. Актуальная версия всегда
                                доступна на этой странице.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                8. Контакты
                            </h2>
                            <p>
                                По всем вопросам вы можете связаться с нами
                                через поддержку Websity.
                            </p>
                        </section>
                    </div>

                </div>

            </>
            <div className='mx-20 sm:flex hidden flex-col items-center w-full'>
                <PopularTopicsBarChart/>
                <CompareMatWorkLineChart/>

            </div>

            <section className="relative z-10 my-20 ">
                <p className="text-center text-white/50 text-sm mb-6">
                    Нам доверяют студенты и команды из компаний
                </p>

                <InfiniteLogos />
            </section>
            <>

                <div className="max-w-4xl mx-auto px-6 py-24">
                    <h1 className="text-xl sm:text-4xl font-bold mb-6">Политика конфиденциальности</h1>

                    <p className="text-muted-foreground mb-10">
                        Настоящая Политика конфиденциальности описывает, какие данные
                        собирает Websity, как они используются и каким образом
                        обеспечивается их защита.
                    </p>

                    <div className="space-y-10 text-muted-foreground">

                        {/* 1 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                1. Какие данные мы собираем
                            </h3>
                            <p className="mb-3">
                                Мы можем собирать следующие категории данных:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Email и имя пользователя</li>
                                <li>Данные аккаунта и профиля</li>
                                <li>Контент, который вы вводите (описания сайтов, сообщения)</li>
                                <li>Сгенерированные проекты и код</li>
                                <li>Технические данные (IP, браузер, устройство)</li>
                            </ul>
                        </section>

                        {/* 2 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                2. Как мы используем данные
                            </h3>
                            <p className="mb-3">
                                Собранные данные используются для:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Предоставления и улучшения функциональности сервиса</li>
                                <li>Генерации сайтов с помощью ИИ</li>
                                <li>Поддержки пользователей</li>
                                <li>Обеспечения безопасности и предотвращения злоупотреблений</li>
                                <li>Аналитики и улучшения пользовательского опыта</li>
                            </ul>
                        </section>

                        {/* 3 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                3. Использование ИИ
                            </h3>
                            <p>
                                Websity использует модели искусственного интеллекта для
                                генерации контента и кода. Вводимые данные могут
                                временно обрабатываться для выполнения запросов,
                                но не используются для идентификации личности.
                            </p>
                        </section>

                        {/* 4 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                4. Хранение данных
                            </h3>
                            <p>
                                Мы храним данные только в течение времени, необходимого
                                для работы сервиса, либо в соответствии с требованиями
                                законодательства.
                            </p>
                        </section>

                        {/* 5 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                5. Передача данных третьим лицам
                            </h3>
                            <p>
                                Мы не продаём и не передаём персональные данные третьим
                                лицам, за исключением случаев, необходимых для работы
                                сервиса (хостинг, платежные провайдеры, аналитика).
                            </p>
                        </section>

                        {/* 6 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                6. Cookies и аналитика
                            </h3>
                            <p>
                                Websity может использовать cookies и аналитические
                                инструменты для улучшения качества сервиса и анализа
                                пользовательского поведения.
                            </p>
                        </section>

                        {/* 7 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                7. Безопасность
                            </h3>
                            <p>
                                Мы применяем современные технические и организационные
                                меры безопасности для защиты данных от утраты,
                                несанкционированного доступа и утечек.
                            </p>
                        </section>

                        {/* 8 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                8. Права пользователей
                            </h3>
                            <p className="mb-3">
                                Вы имеете право:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Запросить доступ к своим данным</li>
                                <li>Исправить или удалить данные</li>
                                <li>Отозвать согласие на обработку</li>
                                <li>Удалить аккаунт</li>
                            </ul>
                        </section>

                        {/* 9 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                9. Изменения политики
                            </h3>
                            <p>
                                Мы можем обновлять настоящую Политику конфиденциальности.
                                Актуальная версия всегда доступна на этом сайте.
                            </p>
                        </section>

                        {/* 10 */}
                        <section>
                            <h3 className="font-semibold text-xl mb-3">
                                10. Контакты
                            </h3>
                            <p>
                                По вопросам конфиденциальности вы можете связаться с нами
                                через страницу контактов или по email службы поддержки.
                            </p>
                        </section>

                    </div>

                </div>

            </>
            <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>
            <Footer/>
        </div>
    );
};

export default AboutPage;
