import { connectDB } from "@/utils/connect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const { fullName, email, password } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json("Email is already in use.", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json("User successfully registered.", { status: 200 });
  } catch (err: any) {
    return NextResponse.json(err, {
      status: 500,
    });
  }
};
