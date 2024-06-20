import { connectDB } from "@/utils/connect";
import { Course } from "@/models/courseModel";
import { Student } from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

// Unenroll a student from a course
export const DELETE = async (request: NextRequest) => {
  const { accountId } = await request.json();

  try {
    await connectDB("skillforgeDB");
    console.log("Unenrolling student: ", accountId);

    // Fetch the student document
    const student = await Student.findById(accountId);
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const courses = student.courses;
    console.log("Courses: ", courses);
    for (const courseId of courses) {
      await Course.findByIdAndUpdate(
        courseId,
        {
          $pull: { students: accountId },
        },
        { new: true }
      );
    }

    // Delete the student
    await Student.findByIdAndDelete(accountId);

    return NextResponse.json(
      { message: "Student account removed successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
