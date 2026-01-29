"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {FaPython} from "react-icons/fa";

/**
 * Dummy данные — выдуманные цифры
 */
const chartData = [
    { topic: "Python", students: 1240 },
    { topic: "JavaScript", students: 980 },
    { topic: "Angular", students: 640 },
    { topic: "С#", students: 550 },
    { topic: "Java", students: 240 },
]

const chartConfig = {
    students: {
        label: "Студенты",
        color: "hsl(24 94% 50%)",
    },
} satisfies ChartConfig

export function PopularTopicsBarChart() {
    return (
        <Card className="shadow-md mt-20 mb-20">
            <CardHeader>
                <CardTitle>🔥 Популярные темы курсов</CardTitle>
                <CardDescription>
                    Топ-5 направлений по количеству студентов
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="topic"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />

                        <Bar
                            dataKey="students"
                            fill="var(--color-students)"
                            radius={8}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    <FaPython className='text-orange-500'/>
                    <div className='flex items-center'>


                   <span className="text-blue-400">Pyt</span><span  className="text-yellow-500">hon</span>
                    </div>
                        — лидер по популярности <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground">
                    Данные демонстрационные на 1 февраля 2026 года
                </div>
            </CardFooter>
        </Card>
    )
}
