'use client'
import React, {useEffect, useState} from 'react'
import {useParams} from "next/navigation";
import axios from "axios";
import {toast} from "sonner";
import CourseInfo from "@/app/workspace/edit-course/_components/CourseInfo";
import ChapterTopicList from "@/app/workspace/edit-course/_components/ChapterTopicList";
import {Loader2Icon} from "lucide-react";
import {LoaderOne} from "@/components/ui/loader";

const EditCoursePage = ({viewCourse}:any) => {
    const {courseId} = useParams();
    const [loading, setLoading] = useState<boolean>(false)

    const [course, setCourse] = useState()

    useEffect(() => {
        GetCourseInfo()
    }, [])

    const GetCourseInfo  = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`/api/courses?courseId=${courseId}`)
            console.log(result.data)
            setCourse(result.data)
        } catch (error) {
            toast.error('failed to get course')
        }
        setLoading(false)
    }

    if (loading) {
        return        <div className='flex items-center flex-col gap-4 h-screen justify-center w-full'>
            <LoaderOne  />
            Загружаем данные...
        </div>
    }

    return (
        <div className="p-8 max-w-3xl mx-auto ">
            <CourseInfo viewCourse={viewCourse} course={course} courseInfo={course?.courseJson?.course} />
            <ChapterTopicList course={course} />
        </div>
    )
}
export default EditCoursePage
