import { connectDB } from "@/utils/connect";
import { Student } from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  const { email } = await request.json();

  await connectDB("skillforgeDB");

  const user = await Student.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "user does not exist." },
      { status: 404 }
    );
  }

  try {
    await Student.deleteOne({ email });
    return NextResponse.json("User account successfully deleted.", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
};

// export const DELETE = async (request: any) => {
//   const session = await getSession({ req: request });
//   console.log(session);

//   if (!session) {
//     return NextResponse.json(
//       { message: "You must be logged in to delete your account." },
//       { status: 401 }
//     );
//   }

//   const email = session.user.email;

//   await connectDB("skillforgeDB");

//   const user = await User.findOne({ email });
//   if (!user) {
//     return NextResponse.json(
//       { message: "user does not exist." },
//       { status: 404 }
//     );
//   }

//   try {
//     await User.deleteOne({ email });
//     return NextResponse.json("User account successfully deleted.", {
//       status: 200,
//     });
//   } catch (error) {
//     return NextResponse.json(error, {
//       status: 500,
//     });
//   }
// };
