import { Student } from "@/models/studentModel";
import { connectDB } from "@/utils/connect";
import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json(`⚠️ Webhook Error: ${error}`, { status: 400 });
  }

  try {
    await connectDB();

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "payment") {
          const customerId = session.customer as string;

          const student = await Student.findOne({ stripeId: customerId });
          if (student) {
            student.subscriptionTier = "Pro";
            await student.save();
          }
          console.log("NATAWAG!");
        }
        break;
      default:
        return NextResponse.json(
          `Webhook Error: Unhandled Event type ${event.type}`,
          { status: 200 }
        );
    }
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed", { status: 500 });
  }
};
