'use client'

import React from "react";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FailurePage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
            <div className="max-w-md w-full text-center space-y-6">
                <XCircle className="mx-auto h-20 w-20 text-red-500" />

                <h1 className="text-3xl font-bold text-white">
                    Платёж не прошёл 😕
                </h1>

                <p className="text-white/60">
                    Что-то пошло не так при обработке платежа.
                    Деньги не списаны. Попробуйте ещё раз или используйте другой способ оплаты.
                </p>

                <div className="flex flex-col gap-3">
                    <Button
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => router.push("/pricing")}
                    >
                        Попробовать снова
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => router.push("/support")}
                    >
                        Связаться с поддержкой
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FailurePage;
