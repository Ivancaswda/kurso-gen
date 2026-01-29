'use client'
import React from 'react'
import Footer from "@/components/Footer";



const PolicyPage = () => {
    return (
        <>

            <div className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold mb-6">Политика конфиденциальности</h1>

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
            <Footer/>
        </>

    )
}

export default PolicyPage
