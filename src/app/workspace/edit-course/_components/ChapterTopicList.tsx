import React from 'react'

const ChapterTopicList = ({course}: any) => {

    const courseLayout = course?.courseJson?.course
    console.log('courseLayout===')
    console.log(courseLayout)

    return (
        <div className="space-y-8 mt-20">
            <h2 className="font-semibold text-3xl text-center mb-6">Главы и темы</h2>
            <div>
                {courseLayout?.chapters.map((chapter:any, chapterIndex: number) => (
                    <div key={chapterIndex} className="flex flex-col gap-5">
                        <div className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="font-semibold text-xl text-center">{chapter.chapterName}</h3>
                            <p className="text-gray-600 text-center">Длительность: {chapter.duration}</p>
                            <p className="text-gray-600 text-center">Темы: {chapter?.topics?.length}</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl">
                            {chapter?.topics.map((topic:any, topicIndex:number) => (
                                <div key={topicIndex} className="flex items-center gap-4 mb-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                    <span className="text-lg font-medium text-gray-700">{topic}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ChapterTopicList
