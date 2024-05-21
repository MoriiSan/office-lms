import { connectDB } from "@/utils/connect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const { name, email, password } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email is already in use." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json("User successfully registered.", { status: 201 });
  } catch (err: any) {
    return NextResponse.json(err, {
      status: 500,
    });
  }
};
