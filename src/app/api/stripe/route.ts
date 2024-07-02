import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const product = await stripe.products.retrieve(
      process.env.STRIPE_PRODUCT_ID
    );
    if (!product) {
      return NextResponse.json("Product does not exist", { status: 404 });
    }

    const priceData = await stripe.prices.retrieve(product.default_price);
    if (!priceData) {
      return NextResponse.json("Price does not exist", { status: 404 });
    }

    const price = priceData.unit_amount / 100;

    return NextResponse.json({ price }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product: ", error },
      { status: 500 }
    );
  }
};

