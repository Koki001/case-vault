import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const { email } = req.body; // Extract email from the request body

    // Query the database to find a user with the matching email
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      // If no user is found, return a response indicating that the email doesn't match any user
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If a user is found, return the user's badgeNumber
    return NextResponse.json({ user });
  } catch (error) {
    // Return 500 if any error occurs
    return NextResponse.json({ error }, { status: 500 });
  }
};
