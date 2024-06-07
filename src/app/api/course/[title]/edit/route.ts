import { connectDB } from "@/utils/connect";
import Course from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

// Update a course
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const {
    title,
    courseCode,
    description,
    students,
    modules,
    imageThumbnail,
    videoUrl,
    isPublished,
    category,
    price,
  } = await request.json();

  await connectDB("adminDB");

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      params.id,
      {
        title,
        courseCode,
        description,
        students,
        modules,
        imageThumbnail,
        videoUrl,
        isPublished,
        category,
        price,
      },
      { new: true }
    );
    if (!updatedCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
};