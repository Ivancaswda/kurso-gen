import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { usersTable } from "../../../../../configs/schema";
import { eq } from "drizzle-orm";
import {db} from "../../../../../configs/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-08-16' });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature")!;
    const body = await req.text();

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed.", err);
        return NextResponse.json({ error: "Webhook error" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const credits = Number(session.metadata?.credits);

        if (userId && credits) {
            const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
            if (!user[0]) {
                console.warn(`Пользователь с id ${userId} не найден`);
            } else {
                const newCredits = (user[0].credits || 0) + credits;
                await db.update(usersTable).set({ credits: newCredits }).where(eq(usersTable.id, userId)).execute();
                console.log(`✅ Добавлено ${credits} кредитов пользователю ${user[0].email}`);
            }
        }
    }

    return NextResponse.json({ received: true });
}
