"use client";

import React, {useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {Coins, Stars} from "lucide-react";
import {toast} from "sonner";
import axios from "axios";

const creditOptions = [
    { credits: 5, price: 500},
    { credits: 10, price: 900  },
    { credits: 15, price: 1300},
    { credits: 20, price: 1600},
];

export default function PricingPage() {
    const [loading, setLoading] = useState<boolean>()
    const handleCheckout = async (credits:any) => {
        try {
            setLoading(true)
            const {data}  = await axios.post('/api/stripe/create-checkout', {credits})
            if (data.url) {
                window.location.href = data.url
            } else {
                toast.error('Не удалось совершить оплату Stripe')
            }
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error('Не удалось совершить оплату Stripe')
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden ">
            <div className="absolute z-20  h-[500px] w-[500px] bg-orange-500 blur-[140px] rounded-full -top-40 -left-40" />
            <div className="absolute z-20 h-[400px] w-[400px] bg-orange-500 blur-[140px] rounded-full top-20 right-[-200px]" />


            <div className="min-h-screen relative w-full overflow-hidden  py-20 px-4">


                <div className="max-w-5xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
                        Выберите свой <span className="text-primary">план</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Покупайте звезды для создания сайтов с помощью Websity.
                        Больше звезд — выгоднее!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {creditOptions.map((plan, i) => (
                        <motion.div
                            key={plan.credits}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Card className="border-2 border-transparent hover:border-orange-500 transition-all duration-300 shadow-md hover:shadow-xl rounded-2xl">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2 ">
                                        <Stars className="text-orange-500" /> {plan.credits} звезд
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-2">
                                    <p className="text-4xl font-bold ">{plan.price} Руб</p>
                                    <p className="text-gray-500 text-sm">
                                        {plan.credits } генераций контента
                                    </p>
                                    <Button disabled={loading} className='bg-orange-500 hover:bg-orange-400 cursor-pointer'
                                        onClick={() => handleCheckout(plan.credits)}
                                    >
                                        Купить
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center text-gray-500 text-sm">
                    * 1 звезда = 1 генерация контента. Звезды не сгорают.
                </div>
            </div>
        </div>

    );
}
