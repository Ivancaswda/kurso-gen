'use client'
import React from 'react'
import Footer from "@/components/Footer";

const TermsPage = () => {
    return (
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
    <Footer/>

    </>
    )
}

export default TermsPage
