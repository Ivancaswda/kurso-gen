'use client'
import React, {useEffect} from 'react'
import EditCoursePage from "@/app/workspace/edit-course/[courseId]/page";



const ViewCourse = () => {

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, []);

    return (
        <div>
            <EditCoursePage viewCourse={true}/>
        </div>
    )
}
export default ViewCourse
