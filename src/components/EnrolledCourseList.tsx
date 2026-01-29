'use client'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {toast} from "sonner";
import {useAuth} from "../../context/useAuth";
import EnrolledCourseCard from "@/components/EnrolledCourseCard";
import {Skeleton} from "@/components/ui/skeleton";
import {Empty, EmptyMedia, EmptyTitle, EmptyHeader,EmptyDescription,EmptyContent} from "@/components/ui/empty";
import {Icon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaComputer} from "react-icons/fa6";

const EnrolledCourseList = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [enrolledCourses, setEnrolledCourses] = useState<any>([])
    const {user} = useAuth()
    useEffect(() => {
        user && getEnrolledCourses()
    }, [user])
    const getEnrolledCourses = async () => {
        try {
            setLoading(true)
            const result = await axios.get('/api/enroll-course');
            console.log(result.data)
            setEnrolledCourses(result.data)
        } catch (error) {
            console.log(error)
         toast.error('failed to get enrolled courses')
            setLoading(false)
        }
        setLoading(false)
    }

    return (
        <div className='mt-3'>
            {enrolledCourses.length === 0 && loading ?  <div className='flex gap-4 flex-wrap w-full px-4'>
                {[1,2,3,4].map((_,index) => (
                    <div className='flex gap-4 flex-col' key={index}>
                        <Skeleton  className='w-[300px] h-[200px]'/>
                        <Skeleton className='w-[300px] h-[40px]' />

                    </div>

                ))}


                </div> : enrolledCourses.length === 0 && !loading  ? <div>
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                               <FaComputer/>
                            </EmptyMedia>
                            <EmptyTitle>Нет информации</EmptyTitle>
                            <EmptyDescription>Нет курсов по близости</EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button className='bg-orange-600'>Add data</Button>
                        </EmptyContent>
                    </Empty>
                </div>  :
                <div>

                    <h1 className='font-semibold text-2xl text-center'>Курсы на которые вы записались</h1>

                    <div className='gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>



                        {enrolledCourses?.map((course, index) => (
                            <EnrolledCourseCard course={course} key={index}/>
                        ))}

                    </div>
                </div>}
        </div>
    )
}
export default EnrolledCourseList
