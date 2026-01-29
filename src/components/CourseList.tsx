'use client'
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import AddNewCourseDialog from "@/components/AddNewCourseDialog";
import axios from "axios";
import {useAuth} from "../../context/useAuth";
import {toast} from "sonner";
import CourseCard from "@/components/CourseCard";
import {PlusIcon} from "lucide-react";
import {FaMagic} from "react-icons/fa";

const CourseList = () => {
    const [courseList, setCourseList] = useState([])
    const {user} = useAuth()
    console.log(user)
    useEffect(() => {
       user && GetCourseList()
    }, [user])

    const GetCourseList = async  () => {
        try {
            const result =  await axios.get('/api/courses')

            setCourseList(result.data)
            console.log(result.data)
        } catch (error) {
            toast.error('failed to get courses')
            console.log(error)
        }
    }


    return (
        <div className='px-3 my-12'>
            <h2 className='font-semibold text-2xl text-center'>Список курсов</h2>
            {
                courseList.length === 0 ? <div className='flex items-center justify-center flex-col gap-4 mt-2'>
                    <Image alt='logo' src='/logo.png' width={120} height={120} className='w-[180px] h-[180px]'/>
                    <h2 className='my-2 text-lg font-bold'>Похоже у вас еще нету курсов</h2>
                    <AddNewCourseDialog>


                            <Button className='bg-orange-500 cursor-pointer'>
                                <PlusIcon/> Создайте ваш первый курс
                            </Button>

                    </AddNewCourseDialog>

                </div> :
                    <>
                        <div className='gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
                            {courseList.map((course, index) => (
                                <CourseCard getCourseList={GetCourseList} course={course} key={index}/>
                            ))}

                        </div>
                        <div className='flex items-center justify-center mt-20  flex-col'>
                            <FaMagic className='text-orange-500 animate-bounce size-[70px]'/>
                            <h2 className='text-2xl my-8 font-semibold text-orange-700'>Хотите создать еще один курс?</h2>
                            <AddNewCourseDialog>


                                <Button className='bg-orange-500 cursor-pointer'>
                                    <PlusIcon/> Создайте ваш очередной курс
                                </Button>

                            </AddNewCourseDialog>
                        </div>
                    </>

            }


        </div>
    )
}
export default CourseList
