'use client'
import React, {useEffect, useState} from 'react'
import { MacbookScrollDemo} from "@/app/dashboard/_components/MacBookHeroEffect";
import {WobbleCard} from "@/components/ui/wobble-card";
import EnrolledCourseList from "@/components/EnrolledCourseList";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {useAuth} from "../../../context/useAuth";
import axios from "axios";
import {LoaderOne} from "@/components/ui/loader";

import Footer from "@/components/Footer";
import {FlipWords} from "@/components/ui/flip-words";
import {FloatingNavDemo} from "@/app/dashboard/_components/FloatingNavbar";
import {Navbarik} from "@/app/dashboard/_components/Navbarik";
import CourseList from "@/components/CourseList";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import MobileNavbar from "@/app/dashboard/_components/MobileNavbar";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";
import {Skeleton} from "@/components/ui/skeleton";
import FloatingAssistant from "@/components/FloatingAssistant";


const chartConfig = {
    created: {
        label: "Созданные курсы",
        color: "hsl(24 94% 50%)",
    },
    enrolled: {
        label: "Записанные курсы",
        color: "hsl(142 76% 36%)",
    },
    homeworks: {
        label: "Домашние задания",
        color: "hsl(262 83% 58%)",
    },
    practice: {
        label: "Практические задания",
        color: "hsl(48 96% 53%)",
    },
};

const DashboardPage = () => {
    const { user, loading } = useAuth();
    const [pending, setPending] = useState<boolean>(false)
    const router = useRouter()
    const [courses, setCourses] = useState<any[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/sign-up");
        }
    }, [user, loading, router]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setPending(true)
                const coursesRes = await axios.get("/api/courses");
                const enrolledRes = await axios.get("/api/enroll-course");

                setCourses(coursesRes.data || []);
                setEnrolledCourses(enrolledRes.data || []);
                setPending(false)
            } catch (err) {
                setPending(false)
                console.error("Ошибка загрузки профиля", err);
            }
        };

        fetchData();
    }, []);

    if (!user)
        return (
            <div className="flex w-full h-screen items-center justify-center ">
                <LoaderOne />
            </div>
        );
    console.log(user)


    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];


    const createdByMonth = months.map((_, i) =>
        courses.filter((c) => new Date(c.createdAt).getMonth() === i).length
    );


    const enrolledByMonth = months.map((_, i) =>
        enrolledCourses.filter((e) => {
            const date = e.enrolledCourse?.createdAt || e.createdAt;
            return date ? new Date(date).getMonth() === i : false;
        }).length
    );
    console.log(enrolledByMonth)

    const words = ["лучшее", "эффективное", "быстрое", "беззатратное"];
    const totalHomeworks = enrolledCourses.reduce((acc, course) => {

        return acc + (course.homeworks && Object.keys(course.homeworks).length > 0 ? 1 : 0);
    }, 0);

    const totalPracticeTasks = enrolledCourses.reduce((acc, course) => {
        return acc + (course.practiceTasks && Object.keys(course.practiceTasks).length > 0 ? 1 : 0);
    }, 0);





    const homeworksByMonth = months.map((_, i) =>
        enrolledCourses.filter((course) => {
            if (!course.homeworks || Object.keys(course.homeworks).length === 0) return false;
            const date = course.enrolledCourse?.createdAt || course.createdAt;
            return date ? new Date(date).getMonth() === i : false;
        }).length
    );


    const practiceByMonth = months.map((_, i) =>
        enrolledCourses.filter((course) => {
            if (!course.practiceTasks || Object.keys(course.practiceTasks).length === 0) return false;
            const date = course.enrolledCourse?.createdAt || course.createdAt;
            return date ? new Date(date).getMonth() === i : false;
        }).length
    );

    const data = {
        labels: months,
        datasets: [
            {
                label: "Созданные курсы",
                data: createdByMonth,
                borderColor: "rgb(249, 115, 22)",
                backgroundColor: "rgba(249, 115, 22, 0.5)",
                tension: 0.3,
            },
            {
                label: "Записанные курсы",
                data: enrolledByMonth,
                borderColor: "rgb(34, 197, 94)",
                backgroundColor: "rgba(34, 197, 94, 0.5)",
                tension: 0.6,
            },
            {
                label: "Домашние задания",
                data: homeworksByMonth,
                borderColor: "rgb(132,22,249)",
                backgroundColor: "rgba(101,22,249,0.5)",
                tension: 0.9,
            },
            {
                label: "Практические задания",
                data: practiceByMonth,
                borderColor: "rgb(255,222,28)",
                backgroundColor: "rgba(197,173,34,0.5)",
                tension: 0.8,
            },
        ],
    };
    const chartData = months.map((month, index) => ({
        month,
        created: createdByMonth[index],
        enrolled: enrolledByMonth[index],
        homeworks: homeworksByMonth[index],
        practice: practiceByMonth[index],
    }));
    return (
        <div className='flex-col flex gap-4 relative w-full'>
            <div className="absolute z-20  h-[500px] w-[500px] bg-orange-500 blur-[140px] rounded-full top-40 -left-40" />
            <div className="absolute z-20 h-[400px] w-[400px] bg-orange-500 blur-[140px] rounded-full top-20 right-[-200px]" />

            <Navbarik/>
            <MobileNavbar/>

            <div >
                <MacbookScrollDemo/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
                <WobbleCard
                    containerClassName="col-span-1 lg:col-span-2 h-full bg-orange-800 min-h-[500px] lg:min-h-[300px]"
                    className=""
                >
                    <div className="max-w-xs">
                        <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Learnify-AI - ваш виртуальный и компететный учитель
                        </h2>
                        <p className="mt-4 text-left  text-base/6 text-neutral-200">
                            Посещайте уроки сгенерированны искуственным интеллектом и становитесь умнее день за днём
                        </p>
                    </div>
                    <img
                        src="/ai-courses.png"
                        width={500}
                        height={500}
                        alt="linear demo image"
                        className="absolute -right-4 lg:-right-[10%]  -bottom-10 object-contain rounded-2xl"
                    />
                </WobbleCard>
                <WobbleCard containerClassName="col-span-1 bg-orange-600 min-h-[300px]">
                    <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                       Лучшие ИИ курсы только у нас
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        Более <strong>200</strong> учеников уже доверяют и получают лучшее образование у нас
                    </p>
                </WobbleCard>
                <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-orange-700 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                    <div className="max-w-sm">
                        <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                       Регистрируйся сейчас и присоединийся к нашему комьюнити
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                            Мы предостовляем лучший программу образования по любому предмету на момент сентября 2025 года
                        </p>
                    </div>
                    <img
                        src="/homework.png"
                        width={500}
                        height={500}
                        alt="linear demo image"
                        className="absolute -right-40 md:-right-[10%] lg:-right-[1%] -bottom-10 object-contain rounded-2xl"
                    />
                </WobbleCard>

            </div>

            <CourseList/>
            {pending ?   <div className="grid grid-cols-1 mt-10 md:grid-cols-4 gap-6">
                <Skeleton className='w-full h-[100px] rounded-xl'/>
                    <Skeleton className='w-full h-[100px] rounded-xl'/>
                    <Skeleton className='w-full h-[100px] rounded-xl'/>
                    <Skeleton className='w-full h-[100px] rounded-xl'/>
                </div> :
                <div className="grid grid-cols-1 mt-10 md:grid-cols-4 gap-6">
                <Card className="shadow-md cursor-pointer transition-all hover:scale-105">
                    <CardHeader>
                        <CardTitle>Созданные курсы</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold text-orange-600">{courses.length}</CardContent>
                </Card>

                <Card className="shadow-md cursor-pointer transition-all hover:scale-105">
                    <CardHeader>
                        <CardTitle>Записанные курсы</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold text-green-600">{enrolledCourses.length}</CardContent>
                </Card>
                <Card className="shadow-md cursor-pointer transition-all text-purple-600 hover:scale-105">
                    <CardHeader>
                        <CardTitle>Сделанные дз</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold text-purple-600">{totalHomeworks}</CardContent>
                </Card>
                <Card className="shadow-md cursor-pointer transition-all text-yellow-400 hover:scale-105">
                    <CardHeader>
                        <CardTitle>Практические задания</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold text-yellow-400">{totalPracticeTasks}</CardContent>
                </Card>
            </div>
            }
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Аналитика за текущий год</CardTitle>
                </CardHeader>

                <CardContent>
                    {pending ?
                        <Skeleton className='w-full h-[50vh] rounded-xl'/>
                        :    <ChartContainer config={chartConfig} className="h-[320px] w-full">
                        <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />

                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />

                            <Area
                                dataKey="created"
                                type="natural"
                                fill="var(--color-created)"
                                stroke="var(--color-created)"
                                fillOpacity={0.35}
                            />

                            <Area
                                dataKey="enrolled"
                                type="natural"
                                fill="var(--color-enrolled)"
                                stroke="var(--color-enrolled)"
                                fillOpacity={0.35}
                            />

                            <Area
                                dataKey="homeworks"
                                type="natural"
                                fill="var(--color-homeworks)"
                                stroke="var(--color-homeworks)"
                                fillOpacity={0.3}
                            />

                            <Area
                                dataKey="practice"
                                type="natural"
                                fill="var(--color-practice)"
                                stroke="var(--color-practice)"
                                fillOpacity={0.3}
                            />
                        </AreaChart>
                    </ChartContainer>}

                </CardContent>
            </Card>


            <div>
                <h2 className='font-bold text-lg px-6 mt-5'>Мое обучение</h2>
                <EnrolledCourseList/>
            </div>




            <div className="h-[40rem] flex justify-center items-center px-4">
                <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
                    Получай
                    <FlipWords words={words} /> <br />
                    образование  с  <span className='font-semibold text-orange-500'>Learnify-AI</span>
                </div>
            </div>
            <FloatingAssistant/>
            <Footer/>
        </div>
    )
}
export default DashboardPage
