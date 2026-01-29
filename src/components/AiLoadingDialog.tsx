'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    "Анализируем тему курса",
    "Проектируем структуру",
    "Генерируем главы и темы",
    "Подключаем ИИ-контент",
    "Финальные штрихи ✨",
];

const AILoadingDialog = ({ open }: { open: boolean }) => {
    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-md text-center">
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center gap-2 text-xl">
                        <SparklesIcon className="text-orange-500" />
                        ИИ создаёт курс
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6 py-6">
                    <Loader2Icon className="w-10 h-10 animate-spin text-orange-500" />

                    <div className="flex flex-col gap-2">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.6 }}
                                className="text-sm text-muted-foreground"
                            >
                                {step}
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                        Обычно занимает 10–30 секунд
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AILoadingDialog;
