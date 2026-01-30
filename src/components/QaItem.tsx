'use client'

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const QAItem = ({ title, content }: { title: string; content: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-white/10 py-4">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 text-left w-full group"
            >
                <ChevronRight
                    className={cn(
                        "w-5 h-5  transition-transform duration-300",
                        open && "rotate-90"
                    )}
                />

                <span className="text-4xl text-gray-600 font-medium  group-hover:text-orange-400 transition">
          {title}
        </span>
            </button>

            <div
                className={cn(
                    "pl-8 pr-2  text-2xl leading-relaxed overflow-hidden transition-all duration-300",
                    open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                {content}
            </div>
        </div>
    );
};

export default QAItem;
