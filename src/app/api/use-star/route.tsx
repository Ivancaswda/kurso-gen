import { NextRequest, NextResponse } from "next/server";
import getServerUser from "@/lib/auth-server";
import { usersTable } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import {db} from "../../../../configs/db";

export async function POST(req: NextRequest) {
    try {
        const user = await getServerUser();
        if (!user) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

        const dbUser = await db.select().from(usersTable).where(eq(usersTable.email, user.email)).limit(1);
        if (!dbUser[0] || (dbUser[0].credits || 0) <= 0) {
            return NextResponse.json({ error: "Нет кредитов" }, { status: 400 });
        }

        const updatedCredits = (dbUser[0].credits || 0) - 1;
        await db.update(usersTable).set({ credits: updatedCredits }).where(eq(usersTable.email, user.email)).execute();

        return NextResponse.json({ success: true, credits: updatedCredits });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
