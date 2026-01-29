"use client"

import React, { useEffect, useRef, useState } from "react"
import { Users, Handshake, BadgeCheck } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type StatCardProps = {
    title: string
    value: number
    icon: React.ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
    const ref = useRef<HTMLDivElement | null>(null)
    const [count, setCount] = useState(0)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true)
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) observer.observe(ref.current)

        return () => observer.disconnect()
    }, [started])

    useEffect(() => {
        if (!started) return

        let current = 0
        const increment = Math.ceil(value / 60)

        const interval = setInterval(() => {
            current += increment
            if (current >= value) {
                current = value
                clearInterval(interval)
            }
            setCount(current)
        }, 20)

        return () => clearInterval(interval)
    }, [started, value])

    return (
        <Card ref={ref} className="shadow-md transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                    {icon}
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
        <span className="text-4xl font-bold text-orange-600">
          {count}+
        </span>
            </CardContent>
        </Card>
    )
}

export function AnimatedStatsCards() {
    return (
        <div className="grid my-20 grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                title="Учеников"
                value={200}
                icon={<Users className="w-6 h-6" />}
            />
            <StatCard
                title="Спонсоров"
                value={27}
                icon={<Handshake className="w-6 h-6" />}
            />
            <StatCard
                title="Партнёров"
                value={5}
                icon={<BadgeCheck className="w-6 h-6" />}
            />
        </div>
    )
}
