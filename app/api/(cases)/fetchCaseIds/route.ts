import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Fetch only the IDs of all cases from the database
    const cases = await db.case.findMany({
      select: {
        id: true,
        caseNumber: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ cases }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
};
