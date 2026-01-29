'use client'
import React from 'react'
import {SparklesCore} from "@/components/ui/sparkles";
import {Vortex} from "@/components/ui/vortex";
import {MaskContainer} from "@/components/ui/svg-mask-effect";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Footer from "@/components/Footer";
import {GlowingEffect} from "@/components/ui/glowing-effect";
import {useRouter} from "next/navigation";
import FAQ from "@/components/Faq";
import {PinContainer} from "@/components/ui/3d-pin";
import {Box, Settings, Lock, Sparkles, Search} from "lucide-react";
import Image from "next/image";
import FloatingAssistant from "@/components/FloatingAssistant";
const GridItem = ({ area, icon, title, description }: any) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-gray-600 p-2">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                                {title}
                            </h3>
                            <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
const Page = () => {
    const router = useRouter()
    return (
        <div className="w-full relative min-h-screen flex flex-col overflow-hidden">

              <div className="h-[90vh] flex flex-col items-center justify-center relative bg-gradient-to-b from-orange-500 via-orange-500 to-black text-white text-center">
                <div className=" bg-white rounded-xl  font-extrabold tracking-tight">

                    <Image src="/logo.png" alt="logo22" width={220} height={220} />

                </div>
                <p className="mt-6 text-lg md:text-2xl max-w-2xl mx-auto text-neutral-200">
                    Инновационная школа будущего, где ИИ помогает учиться быстрее,
                    эффективнее и интереснее.
                </p>
                <div className="mt-8 flex gap-4">
                    <button onClick={() => router.push('/dashboard')} className="px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-neutral-100 transition">
                        Начать обучение
                    </button>
                    <button onClick={() => router.push('/dashboard')} className="px-6 py-3 border border-white/40 text-white rounded-xl font-semibold hover:bg-orange-500 transition">
                        Узнать больше
                    </button>
                </div>
                <SparklesCore
                    background="transparent"
                    minSize={0.5}
                    maxSize={1.2}
                    particleDensity={800}
                    className="absolute bottom-0 w-full h-40"
                    particleColor="#ffffff"
                />
            </div>


            <div className="flex w-full h-[35rem] mx-auto max-w-6xl items-center justify-center overflow-hidden">
                <MaskContainer
                    revealText={
                        <p className="mx-auto text-center text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                            Образование нового поколения доступно каждому.
                        </p>
                    }
                    className="h-[35rem] text-white dark:text-black"
                >
                    Наши курсы помогают освоить{" "}
                    <span className="text-orange-500 font-bold">
            программирование
          </span>{" "}
                    с помощью искусственного интеллекта. Учитесь в удобном темпе, проходите
                    практику и получайте домашние задания.
                </MaskContainer>
            </div>
            <FAQ/>
            <ul className="grid grid-cols-1 my-6 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                <GridItem
                    area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                    icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="ИИ генерирует курсы под вас"
                    description="Опишите цель обучения — КурсоГен автоматически создаст структуру курса, темы и учебный план."
                />

                <GridItem
                    area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                    icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="Интерактивные задания"
                    description="После каждой темы вы получаете практические задания и упражнения для закрепления материала."
                />

                <GridItem
                    area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                    icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="Гибкая настройка обучения"
                    description="Меняйте сложность, пересоздавайте темы и адаптируйте курс под свой уровень и темп."
                />

                <GridItem
                    area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                    icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="Персональный прогресс"
                    description="Ваши курсы, задания и результаты сохраняются — обучение всегда под контролем."
                />

                <GridItem
                    area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                    icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="Раздаточные материалы и ДЗ"
                    description="ИИ формирует конспекты, дополнительные материалы и домашние задания для глубокого понимания."
                />
            </ul>

            <div className="w-full h-[60vh] overflow-hidden">
                <Vortex
                    backgroundColor="black"
                    rangeY={600}
                    particleCount={400}
                    baseHue={30}
                    className="flex flex-col items-center justify-center px-4 md:px-10 py-6 w-full h-full"
                >
                    <h2 className="text-white text-3xl md:text-5xl font-bold text-center">
                        Почему именно КурсоГен?
                    </h2>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                            <CardHeader>
                                <CardTitle>Интерактивные уроки</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Курсы построены так, чтобы вы сразу могли применять знания на
                                практике.
                            </CardContent>
                        </Card>
                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                            <CardHeader>
                                <CardTitle>Домашние задания</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Как в школе: получите задания после урока и закрепите материал.
                            </CardContent>
                        </Card>
                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                            <CardHeader>
                                <CardTitle>Раздаточный материал</CardTitle>
                            </CardHeader>
                            <CardContent>
                               КурсоГен ИИ дает вам материал для повторения чтобы полностью закрепить пройденный урок
                            </CardContent>
                        </Card>
                    </div>
                </Vortex>
            </div>


            <div className="h-[30rem] w-full bg-gradient-to-b from-black to-orange-800 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white text-3xl md:text-6xl font-bold mb-6">
                    Учись эффективно при помощи КурсоГен
                </h1>
                <p className="text-neutral-200 text-lg md:text-xl max-w-2xl">
                    Более <span className="text-orange-400 font-bold">200 студентов</span>{" "}
                    уже учатся вместе с нами. Станьте частью комьюнити!
                </p>
                <button onClick={() => router.push('/sign-up')} className="mt-8 px-8 py-3 bg-orange-600 hover:bg-orange-700 transition text-white rounded-xl font-semibold">
                    Зарегистрироваться
                </button>
            </div>
            <div className="h-[40rem] w-full flex items-center justify-center ">
                <PinContainer
                    title="Teethify AI"
                    href="https://teethify-ai.vercel.app"
                >
                    <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-[22rem] h-[22rem] bg-black/40 rounded-xl">
                        <h3 className="font-bold text-lg text-white">
                            Teethify AI
                        </h3>

                        <p className="mt-2 text-sm text-neutral-300">
                            Умный ИИ-доктор для диагностики зубов и быстрой онлайн-записи в клинику.
                        </p>

                        <div className="relative mt-4 flex-1 rounded-lg overflow-hidden">
                            <Image
                                src="/teethify.png"
                                alt="Teethify AI preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </PinContainer>
            </div>
            <FloatingAssistant/>
            <Footer/>
        </div>
    )
}
export default Page
