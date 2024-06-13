import { connectDB } from "@/utils/connect";
import { Course } from "@/models/courseModel";
import { Student } from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

// Update a course enrollees
export const PUT = async (
  request: NextRequest,
  { params }: { params: { title: string } }
) => {
  const { enrollee } = await request.json();

  try {
    await connectDB("skillforgeDB");
    console.log("Course enrollee: ", enrollee);
    const updatedCourse = await Course.findOneAndUpdate(
      { title: params.title },
      { $addToSet: { students: enrollee } },
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
    console.log("Error: ", error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};

// Unenroll a student from a course
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { title: string } }
) => {
  const { enrollee } = await request.json();

  try {
    await connectDB("skillforgeDB");
    console.log("Unenrolling student: ", enrollee);
    const updatedCourse = await Course.findOneAndUpdate(
      { title: params.title },
      { $pull: { students: enrollee } },
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
    console.log("Error: ", error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
