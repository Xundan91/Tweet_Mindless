import { NextRequest, NextResponse } from "next/server"; 
import Razorpay from "razorpay";
import { getServerSession } from "next-auth"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    //get there session type  
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    
    const { planName } = await req.json();
    
    let amount = 0;
    let planType = "free";
    
    if (planName === "Medium") {
      amount = 50000;
      planType = 'pro';
    } else if (planName === "Ultimate") {
      amount = 150000;
      planType = "premium";
    } else {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string }
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receiptOrder_${user.id}_${Date.now()}`,
      notes: {
        userId: user.id.toString(),
        planName: planName,
        planType: planType
      }
    };
    
    // order append in database
    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({
      OrderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      userEmail: user.email,
      userName: user.name
    });
  } catch (error) {
    console.error("Error creating Order ", error);
    return NextResponse.json({ error: "failed to create order" }, { status: 500 });
  }
}