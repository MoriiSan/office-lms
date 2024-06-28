import { connectDB } from "@/utils/connect";
import { Course } from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";
import { Instructor } from "@/models/instructorModel";
import { Student } from "@/models/studentModel";
import { auth } from "@/utils/auth";

// Get all published courses
export const GET = async (request: NextRequest) => {
  await connectDB();

  const session = await auth();

  try {
    const courses = await Course.find({ isPublished: true })
      .populate({ path: "instructor", model: Instructor })

    // Map over each course to check enrollment status for the session user
    const courseWithStatus = courses.map((course) => {
      // Check if session user ID is included in the course's students array
      const isEnrolled = course.students.some(
        (student) => student.toString() === session!.user.id
      );

      // Return a modified course object with enrollment status
      return {
        ...course.toObject(),
        isEnrolled: isEnrolled,
      };
    });

    return NextResponse.json(courseWithStatus, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
