import { Course } from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";
import { auth } from "@/utils/auth";
import { Student } from "@/models/studentModel";
import { Instructor } from "@/models/instructorModel";

// Get all courses by Student
export const GET = async (request: NextRequest) => {
  await connectDB();

  try {
    const session = await auth();
    if (!session!.user.id) {
      return NextResponse.json("User does not exist", { status: 404 });
    }

    const student = await Student.findById({ _id: session!.user.id }).populate({
      path: "courses",
      model: Course,
      populate: {
        path: "instructor",
        model: Instructor,
        select: "name",
      },
    });

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
