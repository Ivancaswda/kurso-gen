import React, { useContext } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SelectedChapterContext } from "../../../../context/SelectedChapterContext";
import { LoaderOne } from "@/components/ui/loader";
import {cn} from "@/lib/utils";

const ChapterListSidebar = ({ course, groupIndex, enrolledCourse }: any) => {
    const { selectedChapter, setSelectedChapter } = useContext(SelectedChapterContext);

    if (!course?.courseContent || course.courseContent.length === 0) {
        return (
            <div className='flex items-center w-screen flex-col gap-4 h-screen justify-center '>
                <LoaderOne />
                Загружаем данные...
            </div>
        );
    }

    const currentChapter = course?.courseContent?.[groupIndex];
    const topics = currentChapter?.courseData?.topics || [];
    console.log('enrolledCourse===')
    const completedChapters = enrolledCourse?.completedChapters || [];
    console.log(enrolledCourse.completedChapters)
    return (
        <div className="w-80 bg-secondary p-5  sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <Accordion type="single" collapsible>
                {topics.map((topic, index) => {
                    console.log("groupIndex=== ", groupIndex)
                    console.log("index===",index)

                    const isCompleted = completedChapters.some(
                        (item: any) => item.group == Number(groupIndex) && item.chapter == index
                    );

                    return (

                        <AccordionItem
                            key={index}
                            value={`topic-${index}`}
                            className={cn(
                                selectedChapter === index && 'bg-orange-100',
                                isCompleted && 'bg-green-100'
                            )}
                            onClick={() => setSelectedChapter(index)}
                        >
                            <AccordionTrigger className="text-lg font-medium px-5 ">
                                {index + 1}. {topic.topic}
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-sm text-muted-foreground">
                                    Нажмите, чтобы открыть тему
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default ChapterListSidebar;
