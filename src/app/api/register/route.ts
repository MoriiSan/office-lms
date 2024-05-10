import type { NextApiRequest } from "next";
import { connectDB } from "@/utils/connect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const { fullName, email, password } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("Email is already in use.", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User successfully registered.", { status: 200 }); 
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};

// export const POST = async (req: any) => {
//   const { fullName, email, password } = await req.json();
//   console.log("fullName:", fullName, "email:", email, "password:", password);

//   await connectDB();

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return NextResponse.json(
//       { message: "Email already exists." },
//       { status: 400 }
//     );
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({
//     fullName,
//     email,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     return NextResponse.json(
//       { message: "User registered successfully." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error while registering user:", error);
//     return NextResponse.json(
//       { message: "Error occurred while registering the user." },
//       { status: 500 }
//     );
//   }
// };
