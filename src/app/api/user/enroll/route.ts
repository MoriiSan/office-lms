import { connectDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/studentModel";

//student enrol to a course
export const PUT = async (request: NextRequest) => {
  const { studentId, courseId } = await request.json();

  try {
    await connectDB("skillforgeDB");
    console.log("User Enrollee:", studentId);
    console.log("user CourseId", courseId);

    const user = await Student.findById(studentId);
    // console.log(user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.courses.push(courseId);
    await user.save();

    return NextResponse.json("User enrolled to a course.", { status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};

// Remove a course from a student
export const DELETE = async (request: NextRequest) => {
  const { studentId, courseId } = await request.json();

  try {
    await connectDB("skillforgeDB");
    console.log("Removing course from student:", courseId);

    const user = await Student.findById(studentId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fix: Access the 'courses' property properly
    const courseIndex = user.courses.indexOf(courseId);
    if (courseIndex !== -1) {
      user.courses.splice(courseIndex, 1);
    }
    await user.save();

    return NextResponse.json("Course removed from student.", { status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
