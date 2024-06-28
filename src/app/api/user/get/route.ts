import { Student } from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";

export const POST = async (request: NextRequest) => {
  try {
    const { _id } = await request.json();
    await connectDB();

    const student = await Student.findById(_id);
    if (!student) {
      return NextResponse.json(
        { message: "Student does not exist." },
        { status: 404 }
      );
    }
    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
