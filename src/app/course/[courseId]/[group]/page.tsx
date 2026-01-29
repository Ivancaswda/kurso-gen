'use client'
import React, {useEffect, useState} from 'react'
import Navbar from "@/components/Navbar";
import ChapterListSidebar from "@/app/course/_components/ChapterListSidebar";
import ChapterContent from "@/app/course/_components/ChapterContent";
import {useAuth} from "../../../../../context/useAuth";
import axios from "axios";
import {toast} from "sonner";
import {useParams, useRouter} from "next/navigation";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Menu, RefreshCcw} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AILoadingDialog from "@/components/AiLoadingDialog";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

const CoursePage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [saving, setSaving] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [oneCourse, setOneCourse] = useState<any>()
    const router = useRouter()
    const toggleSidebar = () => setIsOpen(!isOpen)

    const params = useParams();
    const { courseId, group} = params as { courseId: string; group: string };


    const [loading, setLoading] = useState<boolean>(false)
    const [enrolledCourse, setEnrolledCourse] = useState<any>()
    const [course, setCourse] = useState<any>()
    const {user} = useAuth()

    useEffect(() => {
        if (course?.apiKey) {
            setApiKey(course.apiKey);
        }
    }, [course]);
    useEffect(() => {
        user && getEnrolledCourses()
    }, [user])
    useEffect(() => {
        courseId && getCourse()
    }, [courseId]);


    console.log('courseONe===', oneCourse)
    const GenerateCourseContent = async () => {
        try {
            setIsGenerating(true)

            const result = await axios.post('/api/generate-course-content', {
                courseJson: oneCourse.courseJson.course,
                courseTitle: oneCourse?.name,
                courseId: oneCourse?.cid,
                apiKey: oneCourse.apiKey
            })
            console.log(result.data)
            router.replace('/workspace')
            toast.success('Курс успешно сгенерирован!')
        } catch (error) {
            const status = error?.response?.status;
            const message = error?.response?.data?.message;

            if (status === 503) {
                toast.error(
                    message || 'Gemini API недоступен. Попробуйте другой API ключ'
                );
            } else if (status === 401) {
                toast.error('Вы не авторизованы');
            } else {
                toast.error(message || 'Ошибка генерации курса');
            }
            setIsGenerating(false)
        }
        setIsGenerating(false)
    }
    const getCourse = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`/api/courses?courseId=${courseId}`);
            console.log(result.data)

            setOneCourse(result.data)
        } catch (error) {
            toast.error('failed to get  course')
            setLoading(false)
        }
        setLoading(false)
    }
    const getEnrolledCourses = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`/api/enroll-course?courseId=${courseId}`);
            console.log(result.data)
            setEnrolledCourse(result.data.enrolledCourse)
            setCourse(result.data.courses)
        } catch (error) {
            toast.error('failed to get enrolled course')
            setLoading(false)
        }
        setLoading(false)
    }
    const updateApiKey = async () => {
        try {
            setSaving(true);
            await axios.put("/api/courses", {
                courseId,
                apiKey,
            });
            toast.success("API-ключ обновлён");
            setOpenDialog(false);
            getEnrolledCourses();
        } catch (e) {
            toast.error("Не удалось обновить API-ключ");
        } finally {
            setSaving(false);
        }
    };
    return (
        <div className='max-h-screen'>
            <AILoadingDialog open={isGenerating} />
            <div className="flex gap-3 justify-between p-4">
                <Link href="/dashboard" >
                    <Image alt='logo' src='/logo.png' width={120} height={120} className='w-[60px] h-[60px]'/>
                </Link>
                <div className="flex items-center gap-3 lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="p-0 w-80">
                            <ChapterListSidebar
                                course={course}
                                enrolledCourse={enrolledCourse}
                                groupIndex={group}
                            />
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='flex items-center gap-4'>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                Изменить API-ключ
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Изменение API-ключа</DialogTitle>
                            </DialogHeader>

                            <Input
                                placeholder="Вставьте API-ключ"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />
                            <p>Зайдите на сайт <span className='text-orange-600'>ai.google.dev</span> - создайте новый ключ - вставьте его сюда  </p>

                            <DialogFooter>
                                <Button className='bg-orange-500'
                                        onClick={updateApiKey}
                                        disabled={!apiKey || saving}
                                >
                                    {saving ? "Сохранение..." : "Сохранить"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button disabled={isGenerating || loading} onClick={GenerateCourseContent} className='bg-orange-500'>
                        <RefreshCcw className={`${isGenerating && 'animate-spin'}`}/>
                        {isGenerating ? 'Подождите...' : 'Перегенерировать курс'}
                    </Button>
                </div>

            </div>
            <div className="flex flex-col lg:flex-row gap-3 items-start">

                <div className="hidden lg:block">
                    <ChapterListSidebar
                        course={course}
                        enrolledCourse={enrolledCourse}
                        groupIndex={group}
                    />
                </div>

                <div className="flex-1 w-full">
                    <ChapterContent
                        getCourse={getCourse}
                        course={course}
                        enrolledCourse={enrolledCourse}
                        groupIndex={group}
                        refreshData={getEnrolledCourses}
                    />
                </div>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={`/course/${courseId}/${group - 1}`} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href={`/course/${courseId}/1`} >1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href={`/course/${courseId}/${group + 1}`} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
export default CoursePage
