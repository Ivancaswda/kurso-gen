import {NextRequest, NextResponse} from "next/server";
import getServerUser from "@/lib/auth-server";
import {db} from "../../../../configs/db";
import {coursesTable} from "../../../../configs/schema";
import {desc, eq, and} from "drizzle-orm";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId');
    const user = await getServerUser();

    if (courseId) {
        const result = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId));
        if (!result[0]) return NextResponse.json({ error: "Курс не найден" }, { status: 404 });

        const course = result[0];


        const serializedCourse = {
            ...course,
            createdAt: course.createdAt?.toISOString(),
            courseContent: JSON.parse(JSON.stringify(course.courseContent)),
            courseJson: JSON.parse(JSON.stringify(course.courseJson))
        };

        return NextResponse.json(serializedCourse);
    } else {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.userEmail, user?.email))
            .orderBy(desc(coursesTable.id));

        const serialized = result.map(course => ({
            ...course,
            createdAt: course.createdAt?.toISOString(),
            courseContent: JSON.parse(JSON.stringify(course.courseContent)),
            courseJson: JSON.parse(JSON.stringify(course.courseJson))
        }));

        return NextResponse.json(serialized);
    }
}
export async function PUT(req: NextRequest) {
    const {apiKey, courseId} = await req.json()

    const user = await getServerUser()

    const courseResult = await db.update(coursesTable).set({
        apiKey: apiKey
    }).where(eq(coursesTable.cid, courseId))



    return NextResponse.json({
        success:true
    })
}