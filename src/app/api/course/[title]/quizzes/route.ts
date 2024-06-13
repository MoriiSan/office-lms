import { connectDB } from "@/utils/connect";
import { Course } from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";
import { Instructor } from "@/models/instructorModel";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Get a single course
export const GET = async (
  request: NextRequest,
  { params }: { params: { title: string } }
) => {
  await connectDB("skillforgeDB");

  const session = await getServerSession(authOptions);

  try {
    const course = await Course.findOne({
      title: params.title,
      isPublished: true,
    }).populate({
      path: "instructor",
      model: Instructor,
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // Check if studentId exists in the course's students array
    if (!course.students.includes(session?.user.id)) {
      return NextResponse.json(
        { message: "Unauthorized access to course" },
        { status: 403 }
      );
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

// Delete a course
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB("skillforgeDB");

  try {
    const deletedCourse = await Course.findByIdAndDelete(params.id);
    if (!deletedCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
