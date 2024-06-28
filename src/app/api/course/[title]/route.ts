import { connectDB } from "@/utils/connect";
import { Course } from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";
import { Instructor } from "@/models/instructorModel";
import { auth } from "@/utils/auth";
import { Student } from "@/models/studentModel";

// Get a single course
export const GET = async (
  request: NextRequest,
  { params }: { params: { title: string } }
) => {
  const session = await auth();

  try {
    await connectDB();

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

    // Fetch the user with the session user ID
    const user = await Student.findById(session?.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isSubscribed = user.subscriptionTier === course.subscriptionTier;

    const courseWithSubStatus = {
      ...course.toObject(),
      isSubscribed: isSubscribed,
    };

    return NextResponse.json(courseWithSubStatus, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

// Delete a course
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();

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
