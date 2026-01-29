"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    IconHome,
    IconTerminal2,
    IconNewSection,
} from "@tabler/icons-react";
import { FaVk } from "react-icons/fa";
import { FileIcon, User2Icon } from "lucide-react";
import Image from "next/image";

const links = [
    { title: "Главная", href: "/", icon: <IconHome /> },
    { title: "Dashboard", href: "/dashboard", icon: <IconTerminal2 /> },
    { title: "Workspace", href: "/workspace", icon: <IconNewSection /> },
    { title: "Профиль", href: "/workspace/profile", icon: <User2Icon /> },
    { title: "VK", href: "https://vk.com", icon: <FaVk /> },
    { title: "О нас", href: "/", icon: <FileIcon /> },
];

export default function MobileNavbar() {
    return (
        <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-30 bg-background border-b md:hidden">
            <Link href="/" >
                <Image src={"/logo.png"} alt={'logo'} width={80} height={80}/>
            </Link>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-72">
                    <Link href="/" >
                        <Image src={"/logo.png"} alt={'logo'} width={60} height={60}/>
                    </Link>
                    <nav className="flex flex-col px-4 gap-4 mt-10">
                        {links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                className="flex items-center gap-3 text-lg font-medium hover:text-orange-500 transition"
                            >
                                {link.icon}
                                {link.title}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
