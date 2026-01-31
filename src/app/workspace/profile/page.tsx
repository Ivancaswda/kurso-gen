"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useAuth } from "../../../../context/useAuth";
import { LoaderOne } from "@/components/ui/loader";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {toast} from "sonner";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {StarsIcon} from "lucide-react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [courses, setCourses] = useState<any[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [badges, setBadges] = useState<any[]>([]);



    useEffect(() => {
        if (user?.email) {
            axios.post("/api/get-badges").then((res) => {
                if (res.data.awardedBadges?.length) {
                    res.data.awardedBadges.forEach((badge: any) => {
                        toast.success(`Вы получили звание «${badge.title}» 🎉`);
                    });
                    setBadges((prev) => [...prev, ...res.data.awardedBadges]);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesRes = await axios.get("/api/courses");
                const enrolledRes = await axios.get("/api/enroll-course");

                setCourses(coursesRes.data || []);
                setEnrolledCourses(enrolledRes.data || []);
            } catch (err) {
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

    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    // данные по созданным курсам
    const createdByMonth = months.map((_, i) =>
        courses.filter((c) => new Date(c.createdAt).getMonth() === i).length
    );

    // данные по подпискам
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
    const router = useRouter()

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">

            <Card className="flex items-center text-center gap-6 p-6 shadow-md">
                <Avatar className="w-20 h-20 ">
                    <AvatarImage src={user.avatarUrl || ""} />
                    <AvatarFallback className="bg-orange-500 text-white text-4xl font-semibold">
                        {user.userName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-2xl font-semibold">{user.userName}</h2>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </Card>
            <div className="mt-10">
                <h2 className="font-bold text-lg px-6">Мои звезды</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 mt-4">

                            <Card

                                className="flex gap-4 items-center justify-center p-4 shadow-md"
                            >
                                <CardTitle className="mt-2 text-center"><StarsIcon/></CardTitle>
                                <p className="text-sm text-neutral-500 text-center">
                                    {user?.credits}

                                </p>
                            </Card>

                    </div>

            </div>
            <div className="mt-10">
                <h2 className="font-bold text-lg px-6">Мои награды</h2>
                {badges.length === 0 ? (
                    <p className="px-6 text-neutral-500">Наград пока нет</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 mt-4">
                        {badges.map((badge) => (
                            <Card
                                key={badge.id}
                                className="flex flex-col items-center justify-center p-4 shadow-md"
                            >
                                {badge.iconUrl && (
                                    <Image src={badge.iconUrl} width={40} height={40} alt={badge.title} className="w-16 h-16 object-cover" />
                                )}
                                <CardTitle className="mt-2 text-center">{badge.title}</CardTitle>
                                <p className="text-sm text-neutral-500 text-center">
                                    {badge.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Созданные курсы</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold text-orange-600">{courses.length}</CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Записанные курсы</CardTitle>
                    </CardHeader>
                    <CardContent className="text-3xl font-bold text-green-600">{enrolledCourses.length}</CardContent>
                </Card>
            </div>


            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Аналитика по месяцам</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mx-auto w-full max-w-7xl">
                        <Line data={data} />
                    </div>
                </CardContent>
            </Card>
            <Button className='bg-red-500  text-white w-full rounded-xl'   onClick={() => {
                logout();
                router.push('/sign-up')
                toast.success('Вы успешно вышли')
            }}>
                Выйти из аккаунта
            </Button>

        </div>
    );
}
