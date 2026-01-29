import {NextRequest, NextResponse} from "next/server";

import getServerUser from "@/lib/auth-server";
import {db} from "../../../../configs/db";
import {coursesTable, enrolledCourseTable} from "../../../../configs/schema";
import {and, desc, eq, ne, sql} from "drizzle-orm";
import {awardBadge} from "@/lib/award-badge";
export async function POST(req: NextRequest) {
    const {courseId} = await req.json()

    const user = await getServerUser()
    const userEmail = user?.email
    const enrollCourses  = await db.select().from(enrolledCourseTable)
        .where(and(eq(enrolledCourseTable.userEmail, user?.email),
            eq(enrolledCourseTable.cid, courseId)
        ))
    const completedCourses = new Set(enrollCourses.map((e) => e.cid)).size;

    if (completedCourses >= 3) {
        await awardBadge(userEmail, "3_courses");
    }

    if (enrollCourses?.length == 0) {
        const result = await db.insert(enrolledCourseTable)
            .values({
                cid: courseId,
                userEmail: user?.email
            }).returning()

        return NextResponse.json(result)
    }
    return  NextResponse.json({'resp': 'Already Enrolled'})
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const user = await getServerUser();

    if (!user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (courseId) {
        const result = await db
            .select()
            .from(enrolledCourseTable)
            .innerJoin(
                coursesTable,
                eq(enrolledCourseTable.cid, coursesTable.cid)
            )
            .where(
                and(
                    eq(enrolledCourseTable.userEmail, user.email),
                    eq(enrolledCourseTable.cid, courseId)
                )
            )
            .orderBy(desc(enrolledCourseTable.id));

        return NextResponse.json(result[0] ?? null);
    }

    const result = await db
        .select()
        .from(enrolledCourseTable)
        .innerJoin(
            coursesTable,
            eq(enrolledCourseTable.cid, coursesTable.cid)
        )
        .where(eq(enrolledCourseTable.userEmail, user.email))
        .orderBy(desc(enrolledCourseTable.id));

    return NextResponse.json(result);
}

export async function PUT(req) {
    const {completedChapter, courseId}  = await req.json()
    const user = await getServerUser()

    const result = await db.update(enrolledCourseTable).set({
        completedChapters: completedChapter
    }).where(and(eq(enrolledCourseTable.cid, courseId),
    eq(enrolledCourseTable.userEmail, user?.email))).returning()

    return NextResponse.json(result)

}