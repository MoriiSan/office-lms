import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("Server session: ", session);
  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  }

  return NextResponse.json({ success: session }, { status: 200 });
}
