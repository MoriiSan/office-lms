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
    let subscription;

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "payment") {
          console.log("NATAWAG!");
        }
        break;
      default:
        return new NextResponse(
          `Webhook Error: Unhandled Event type ${event.type}`,
          { status: 200 }
        );
    }
    return new NextResponse("Success", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Failed", { status: 500 });
  }
};
