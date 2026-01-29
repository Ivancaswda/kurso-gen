"use client"
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconTerminal2,
} from "@tabler/icons-react";
import {FaInfo, FaMoneyBill, FaSearch, FaStar, FaVk} from "react-icons/fa";
import {FileIcon, User2Icon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {sidebarLinks} from "@/components/Sidebar";
import {toast} from "sonner";
import {useAuth} from "../../../../context/useAuth";
import {FaExplosion} from "react-icons/fa6";

export function Navbarik() {
    const {user, loading, logout} = useAuth()
    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/",
        },

        {
            title: "Dashboard",
            icon: (
                <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/dashboard",
        },
        {
            title: "Дашборд",
            icon: (
                <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/workspace",
        },
        {
            title: "explore",
            icon: (
                <FaSearch/>
            ),
            href: "/workspace/explore",
        },
        {
            title: "About us",
            icon: (
                <FaInfo className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/about",
        },


        {
            title: "Pricing",
            icon: (
                <FaStar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/pricing",
        },
        {
            title: "Profile",
            icon: (
                <User2Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/workspace/profile",
        },
    ];
    return (
        <div className="hidden px-4 py-4 md:flex sticky top-0 z-20 items-center justify-between h-[5rem] w-full">
            <Link href="/" >
                <Image height={150} src="/logo.png" alt="logo" width={150} />
            </Link>
            <FloatingDock
                mobileClassName="translate-y-20"
                items={links}
            />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className='cursor-pointer'>
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback className='bg-orange-300 '>{user?.userName?.[0].toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {sidebarLinks.map((link, idx) => (
                        <DropdownMenuItem  key={idx}>
                            <a

                                href={link.href}
                                className="rounded-lg px-3 py-2 hover:bg-gray-100 transition"
                            >
                                {link.label}
                            </a>
                        </DropdownMenuItem>

                    ))}
                    <DropdownMenuItem >
                        <a

                            onClick={() => {
                                logout();
                                router.push('/sign-up')
                                toast.success('Вы успешно вышли')
                            }}
                            className="rounded-lg px-3 py-2 hover:bg-gray-100 transition"
                        >
                            Выйти
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
