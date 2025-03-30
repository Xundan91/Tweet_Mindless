import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session || !session.user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            planName
        } = await req.json();

        // Make sure environment variable names match
        const generate_signature = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generate_signature !== razorpay_signature) {
            return NextResponse.json({
                error: "invalid payment signature"
            }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email as string },
        });

        if (!user) {
            return NextResponse.json({ error: 'user not found' }, { status: 404 });
        }

        let planType;
        let amount;

        if (planName === 'Medium') {
            planType = 'pro';
            amount = 500; // Fix: Should be 500 for $5
        } else if (planName === "Ultimate") {
            planType = 'premium';
            amount = 1500;
        } else {
            return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
        }

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);

        const result = await prisma.$transaction(async (prisma) => {
            const payment = await prisma.payment.create({
                data: {
                    userId: user.id,
                    amount: amount / 100,
                    razorpayPaymentId: razorpay_payment_id,
                    razorpayOrderId: razorpay_order_id,
                    planType: planType as any,
                    status: 'success',
                },
            });

            const subscription = await prisma.subscription.upsert({
                where: { userId: user.id },
                update: {
                    planType: planType as any,
                    startDate: new Date(),
                    endDate: endDate,
                    status: "active"
                },
                create: {
                    userId: user.id,
                    planType: planType as any,
                    startDate: new Date(),
                    endDate: endDate,
                    status: 'active',
                }
            });

            const updatedUser = await prisma.user.update({
                where: { id: user.id },
                data: { type: planType as any },
            });
            
            return { payment, subscription, user: updatedUser };
        });

        return NextResponse.json({
            success: true,
            message: 'payment successful',
            user: {
                email: result.user.email,
                name: result.user.name,
                type: result.user.type
            }
        });

    } catch (error) {
        console.error("error in verifying payment", error);
        return NextResponse.json({
            error: "failed to verify payment"
        }, {
            status: 500
        });
    }
}