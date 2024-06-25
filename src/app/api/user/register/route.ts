import { connectDB } from "@/utils/connect";
import { Student } from "@/models/studentModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password, image, subscriptionTier } = await request.json();

  await connectDB();

  // Handle regular user registration
  if (password) {
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Student({
      name,
      email,
      password: hashedPassword,
      isSSO: false,
      subscriptionTier
    });

    try {
      await newUser.save();
      return NextResponse.json("User successfully registered.", {
        status: 201,
      });
    } catch (error) {
      return NextResponse.json(error, {
        status: 500,
      });
    }
  } else {
    // Handle SSO user registration
    try {
      await Student.create({ name, email, image, isSSO: true, subscriptionTier });
      return NextResponse.json("SSO User successfully registered", {
        status: 201,
      });
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }
};
