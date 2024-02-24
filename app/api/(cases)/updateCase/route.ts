import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const POST = async (req: any) => {
  try {
    const { caseId, objectUrl } = req.body;

    const updatedCase = await db.case.update({
      where: {
        id: caseId,
      },
      data: {
        report: objectUrl,
      },
    });

    return NextResponse.json(
      { message: "Case updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update case" },
      { status: 500 }
    );
  }
};
