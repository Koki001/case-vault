import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const generateBadge = () => {
    let badgeNumber = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      badgeNumber += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return badgeNumber;
  };

  try {
    const { firstName, lastName, email, password } = await req.json();
    const badgeNumber = generateBadge();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        badgeNumber,
      },
    });

    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
