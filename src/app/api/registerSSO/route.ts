import { connectDB } from "@/utils/connect";
import SSO_User from "@/models/SSOModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, image } = await request.json();

  await connectDB("clientDB");

  await SSO_User.create({ name, email, image });
  return NextResponse.json(
    { message: "SSO successfully saved" },
    { status: 201 }
  );
};

