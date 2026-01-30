'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import {FaAmazon, FaGoogle, FaTelegram, FaTwitch, FaVk, FaYandex} from "react-icons/fa";

const logos = [
    FaGoogle,
    FaYandex,
    FaAmazon,
    FaTwitch,
    FaVk,
    FaTelegram,
    FaGoogle,
    FaYandex,
    FaAmazon,
    FaTwitch,
    FaVk,
    FaTelegram,
    FaGoogle,
    FaYandex,
    FaAmazon,
    FaTwitch,
    FaVk,
    FaTelegram,
    FaGoogle,
    FaYandex,
    FaAmazon,
    FaTwitch,
    FaVk,
    FaTelegram,
    FaGoogle,
    FaYandex,
    FaAmazon,
    FaTwitch,
    FaVk,
    FaTelegram,
];

const InfiniteLogos = () => {
    return (
        <div className="relative overflow-hidden py-16">
            {/* fade edges */}

            <motion.div
                className="flex gap-16 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 80,
                    ease: "linear",
                }}
            >
                {[...logos, ...logos].map((Logo, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center opacity-70 hover:opacity-100 transition"
                    >
                        <Logo
                            width={120}
                            height={40}
                            className="h-10 hover:text-orange-500 transition cursor-pointer w-auto object-contain"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default InfiniteLogos;
