import { motion } from "framer-motion"
import {Menu, X, PlusCircle, XIcon} from "lucide-react"
import {Button} from "@/components/ui/button";
import AddNewCourseDialog from "@/components/AddNewCourseDialog";
import Image from "next/image";
import {useRouter} from "next/navigation";
export const sidebarLinks = [
    { label: "Панель управления", href: "/dashboard" },
    { label: "Моё обучение", href: "/workspace/my-learning" },
    { label: "Изучить курсы", href: "/workspace/explore" },
    { label: "Приобрести Звезды", href: "/pricing" },
    { label: "Профиль", href: "/workspace/profile" },
]
const Sidebar = ({ isOpen, toggle }: any) => {
    const router = useRouter()
    return (
        <motion.div
            initial={{ x: -300 }}
            animate={{ x: isOpen ? 0 : -300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 z-40 flex flex-col"
        >
            <div className='flex items-center mb-6 justify-between w-full'>
                <Image onClick={() => router.push('/')} alt='logo' src='/logo.png' width={60} height={60} className='w-[60px] h-[60px]'/>
                <Button variant="ghost" size="icon" onClick={toggle}>
                    <XIcon className="w-6 h-6" />
                </Button>
            </div>

            <AddNewCourseDialog>
                <Button className="w-full bg-orange-600 mb-4 flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" /> Создать курс
                </Button>
            </AddNewCourseDialog>



            <nav className="flex flex-col gap-2">
                {sidebarLinks.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        className="rounded-lg px-3 py-2 hover:bg-gray-100 transition"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>


            <Button
                variant="ghost"
                className="mt-auto flex items-center gap-2"
                onClick={toggle}
            >
                <X className="w-4 h-4" /> Закрыть
            </Button>
        </motion.div>
    )
}
export default Sidebar