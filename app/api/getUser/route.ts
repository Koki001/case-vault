import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const { email } = await req.json();
    try {
      const user = await db.user.findUnique({ where: { email } });
      if (user) {
        return NextResponse.json(user, { status: 200 }); // Return user data if found
      } else {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        ); // Return 404 if user not found
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 }); // Return 500 if error occurs
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 }); // Return 500 if error occurs
  }
};
