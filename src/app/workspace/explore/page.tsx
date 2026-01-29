'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import CourseCard from "@/components/CourseCard";
import { useAuth } from "../../../../context/useAuth";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {PopularTopicsBarChart} from "@/components/PopularTopicBarChart";
import CompareMatWorkLineChart from "@/components/CompareMatWorkLineChart";
import {AnimatedStatsCards} from "@/components/AnimatedStatsCards";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";

const ExplorePage = () => {
    const [courseList, setCourseList] = useState<any[]>([])
    const { user } = useAuth()
    const [searchInput, setSearchInput] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        user && GetCourseList()
    }, [user])

    const GetCourseList = async () => {
        try {
            setLoading(true)
            const result = await axios.get('/api/courses')
            setCourseList(result.data)

            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error('Не удалось загрузить курсы')
        }
    }

    const filteredCourseList = courseList.filter((item) =>
        searchInput
            ? item.name.toLowerCase().includes(searchInput.toLowerCase())
            : true
    )
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
        <div className="px-6">

            <h2 className="font-bold text-4xl text-center mb-10 text-gray-800 mt-8">
                Изучить больше уроков
            </h2>


            <div className="flex justify-center mb-12">
                <div className="relative w-full max-w-xl flex gap-3">
                    <div className="relative flex-1">
                        <SearchIcon  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Поиск по курсам..."
                            className="pl-10 pr-4 py-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                        />
                    </div>
                    <Button className="rounded-2xl bg-orange-500 hover:bg-orange-600 transition">
                        Искать
                    </Button>
                </div>
            </div>


            <h3 className="font-semibold text-2xl mb-6 text-gray-800">
                Список курсов
            </h3>
            {!loading && filteredCourseList.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <SearchIcon className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">Курсы не найдены</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Попробуйте изменить запрос или поискать позже
                    </p>
                </div>
            )}
            <div className="gap-6 grid mb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {loading &&
                    [0, 1, 2, 3].map((_, index) => (
                        <Skeleton className="w-full h-[260px] rounded-2xl" key={index} />
                    ))}

                {!loading &&
                    filteredCourseList.map((course, index) => (
                        <CourseCard course={course} key={index} />
                    ))}
            </div>

            <PopularTopicsBarChart/>
            <CompareMatWorkLineChart/>
            <AnimatedStatsCards/>
            <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>
        </div>
    )
}

export default ExplorePage
