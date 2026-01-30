'use client'

import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
            <div className="max-w-md w-full text-center space-y-6">
                <CheckCircle className="mx-auto h-20 w-20 text-green-500" />

                <h1 className="text-3xl font-bold text-white">
                    Оплата прошла успешно 🎉
                </h1>

                <p className="text-white/60">
                    Спасибо за покупку! Звезды уже начислены на ваш аккаунт.
                    Вы можете сразу начать создавать курсы.
                </p>

                <div className="flex flex-col gap-3">
                    <Button
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => router.push("/dashboard")}
                    >
                        Перейти в мастерскую
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => router.push("/about")}
                    >
                        Узнать больше о КурсоГене
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
