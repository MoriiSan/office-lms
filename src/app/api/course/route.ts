import { connectDB } from "@/utils/connect";
import Course from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";

// Get all published courses
export const GET = async (request: NextRequest) => {
  await connectDB("adminDB");

  try {
    const courses = await Course.find({ isPublished: true });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
