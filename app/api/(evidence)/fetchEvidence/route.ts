import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    // Fetch all evidence entries from the database
    const evidence = await db.evidence.findMany();
    return NextResponse.json({ evidence }, { status: 200 });
  } catch (error) {
    console.error("Error fetching evidence:", error);
    return NextResponse.json(
      { error: "Failed to fetch evidence" },
      { status: 500 }
    );
  }
};
