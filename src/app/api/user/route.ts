import { connectDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

//student enrol to a course
export const POST = async (request: NextRequest) => {
  const { studentId, courseId } = await request.json();

  try {
    await connectDB("skillforgeDB");
    console.log("User Enrollee:", studentId);
    console.log("user CourseId", courseId);

    const user = await User.findById(studentId);
    // console.log(user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.courses.addToSet(courseId);
    await user.save();

    return NextResponse.json("User enrolled to a course.", { status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
