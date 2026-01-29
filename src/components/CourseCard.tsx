import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {Book, Loader2Icon, PlayCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaHatWizard, FaMagic} from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import {toast} from "sonner";
import {useAuth} from "../../context/useAuth";

const CourseCard = ({course, getCourseList}: any) => {
    const {user} = useAuth()
    const [loading, setLoading] = useState<boolean>(false)


    const onEnrollCourse = async () => {
        try {
        setLoading(true)

        const result = await axios.post('/api/enroll-course', {
            courseId: course?.cid
        })
            if (result.data.resp) {
                toast.warning('Вы уже записались на этот курс!')
            } else {
                toast.success('Вы успешно записались на этот курс!')
                await getCourseList()
            }

        } catch (error) {
            toast.error('failed to enroll the course')
            console.log(error)
            setLoading(false)
        }
        setLoading(false)

    }

    return (
        <div className='mt-3 shadow rounded-xl flex flex-col items-start justify-between p-3'>
           <div className='flex flex-col gap-3'>


            <Image src={course?.bannerImageUrl} alt={course?.name}
                   width={400}
                   height={300}
                   className='w-full object-cover aspect-video rounded-xl'
            />

                <h2 className='font-semibold  text-lg'>{course?.courseJson?.course.name}</h2>
                <p className='line-clamp-3'>{course?.courseJson.course.description}</p>
                <h2 className='flex items-center gap-4 mb-3'> <Book/> {course?.courseJson?.course?.noOfChapters} </h2>
           </div>

            <div>
                {course.courseContent?.length ?


                    <Button disabled={loading} onClick={onEnrollCourse}
                            className='bg-orange-600'>
                        {loading ?
                            <p className='flex items-center gap-3'>
                                <Loader2Icon className='animate-spin'/>
                                Загрузка
                            </p>
                             :  <p className='flex items-center gap-3'>
                                <FaHatWizard/>
                               Записаться
                            </p>}

                        </Button> :
                    <Link href={`/workspace/edit-course/${course?.cid}`} >
                        <Button variant='outline' >  <FaMagic/>Сгенерировать </Button>
                    </Link>

                }

            </div>

        </div>
    )
}
export default CourseCard
