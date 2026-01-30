import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import getServerUser from "@/lib/auth-server";
import {usersTable} from "../../../../../configs/schema";
import {db} from "../../../../../configs/db";
import {eq} from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-08-16' });

const creditPriceMap: Record<number, number> = {
    5: 500,
    10: 900,
    15: 1300,
    20: 1600,
};

export async function POST(req: NextRequest) {
    try {
        const { credits } = await req.json();
        const user = await getServerUser();
        if (!user) return NextResponse.json({ error: "Not authorized" }, { status: 401 });
        let customerId = user.stripeCustomerId;

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
            });

            customerId = customer.id;

            await db
                .update(usersTable)
                .set({ stripeCustomerId: customerId })
                .where(eq(usersTable.email, user.email));
        }

        const price = creditPriceMap[credits];
        if (!price) return NextResponse.json({ error: "Invalid credits" }, { status: 400 });

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'rub',
                        product_data: { name: `${credits} звезд КурсоГен` },
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                }
            ],
            metadata: { userId: user.id, credits },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
        });
        console.log('session===', session)

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
