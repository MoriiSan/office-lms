import { connectDB } from "@/utils/connect";
import { Course } from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";
import { Instructor } from "@/models/instructorModel";

// Get all published courses
export const GET = async (request: NextRequest) => {
  await connectDB("skillforgeDB");

  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "instructor",
      model: Instructor,
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
