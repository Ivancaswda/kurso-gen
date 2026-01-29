"use client"
import React from 'react'
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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


const chartData = [
    { month: "Август", homeworks: 110, handouts: 90 },
    { month: "Сентябрь", homeworks: 180, handouts: 140 },
    { month: "Октябрь", homeworks: 110, handouts: 130 },
    { month: "Ноябрь", homeworks: 140, handouts: 90 },
    { month: "Декабрь", homeworks: 250, handouts: 180 },
    { month: "Январь", homeworks: 540, handouts: 360 },
]

const chartConfig = {
    homeworks: {
        label: "Домашние задания",
        color: "hsl(262 83% 58%)",
    },
    handouts: {
        label: "Раздаточные материалы",
        color: "hsl(48 96% 53%)",
    },
} satisfies ChartConfig
const CompareMatWorkLineChart = () => {
    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle>📚 Сгенерированные учебные материалы</CardTitle>
                <CardDescription>
                    Домашние задания и раздатки за последние 6 месяцев
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig} className="h-[320px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />

                        <Line
                            dataKey="homeworks"
                            type="monotone"
                            stroke="var(--color-homeworks)"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            dataKey="handouts"
                            type="monotone"
                            stroke="var(--color-handouts)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>

            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Рост генерации материалов <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Демонстрационные данные на 1 февраля 2026 года
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
export default CompareMatWorkLineChart
