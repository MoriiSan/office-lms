import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";
import { stripe } from "@/utils/stripe";
import { Student } from "@/models/studentModel";
import { auth } from "@/utils/auth";

export const GET = async (request: NextRequest) => {
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const product = await stripe.products.retrieve("prod_QKt5CDJrSYRGaT");
    if (!product) {
      return NextResponse.json("Product does not exist", { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product: ", error },
      { status: 500 }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
