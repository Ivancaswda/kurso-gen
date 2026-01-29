import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaMagic } from "react-icons/fa";
import Link from "next/link";
import {Progress} from "@/components/ui/progress";

const EnrolledCourseCard = ({ course }: any) => {
    console.log(course)
    const CalculatePercentageProgress = () => {
        const completed = course?.enrolledCourse?.completedChapters?.length ?? 0;
        console.log('completed===', completed)
        // courseContent = [ [ {}, {}, {} ], [ {}, {} ], [ {}, {}, {} ] ]
        const total =
            course?.courses?.courseContent?.reduce(
                (acc: number, chapter: any) =>
                    acc + (chapter?.courseData?.topics?.length ?? 0),
                0
            ) ?? 0;

        if (total === 0) return 0;
        console.log('total===', total)

        return Math.round((completed / total) * 100);
    };


    return (
        <div className="mt-3 shadow-lg rounded-xl flex flex-col p-5 bg-white hover:shadow-xl transition-shadow duration-300">


                <Image width={120} height={120}
                    src={course.courses.bannerImageUrl || '/default-image.jpg'}
                    alt={course.courses.name}

                    className="rounded-xl w-full aspect-video object-cover"
                />



            <h3 className="font-semibold text-xl mb-2">{course.courses.name}</h3>


            <p className="text-gray-600 text-sm mb-3">{course.courses.description}</p>


                <div className="flex flex-col gap-4 justify-between font-semibold items-start text-sm text-gray-500">
                    <span className=''>{course.courses.category}</span>
                    <span className="bg-orange-500 text-white py-1 px-3 rounded-full">{course.courses.label}</span>
                </div>

                <div>
                    <h2 className='flex justify-between text-sm text-orange-600 my-3'>Прогресс <span>{CalculatePercentageProgress()}%</span></h2>
                    <Progress value={CalculatePercentageProgress()}/>

                </div>


            <div className="flex justify-between items-center mt-4">

                <span className="text-sm text-gray-400">
                    {course.enrolledCourse ? `Записан` : `Не записан`}
                </span>


                <Link href={`/workspace/view-course/${course.courses.cid}`}>
                    <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white">
                      Перейти к курсу
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default EnrolledCourseCard;
