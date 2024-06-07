import { connectDB } from "@/utils/connect";
import Course from "@/models/courseModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Update a course
export const PUT = async (
  request: NextRequest,
  { params }: { params: { title: string } }
) => {
  const { students } = await request.json();

  try {
    await connectDB("adminDB");
    const updatedCourse = await Course.findOneAndUpdate(
      { title: params.title },
      { $addToSet: { students } },
      { new: true }
    );
    if (!updatedCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

   await connectDB("clientDB");

    console.log("Updating user with ID:", students);
    const user = await User.findById(students);
    console.log(user)
  
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.courses.addToSet(updatedCourse._id); 
    await user.save();

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    console.log("Error: ", error)
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
