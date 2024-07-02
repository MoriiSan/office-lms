import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";
import { stripe } from "@/utils/stripe";
import { Student } from "@/models/studentModel";
import { auth } from "@/utils/auth";

export const POST = async (request: NextRequest) => {
  const { urlPath } = await request.json();
  try {
    await connectDB();

    const session = await auth();
    // if (!session) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const user = session!.user;

    if (!user || !user.id || !user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const product = await stripe.products.retrieve(
      process.env.STRIPE_PRODUCT_ID
    );
    if (!product) {
      return NextResponse.json("Product does not exist", { status: 404 });
    }

    let student = await Student.findById(user.id);
    if (!student) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!student.stripeId) {
      const customer = await stripe.customers.create({
        email: student.email,
      });

      // Update the student document with the new stripeId
      student.stripeId = customer.id;
      await student.save();
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer: student.stripeId,
      line_items: [
        {
          price: product.default_price,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL!}/allcourses?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL!}/pricing`,
      //   metadata: {
      //     userId: user.id,
      //     type: "lifetime",
      //   },
    });

    if (!stripeSession.url) {
      return new NextResponse("BAD REQUEST: No Stripe Url", { status: 500 });
    }

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
