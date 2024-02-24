import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const POST = async (request: Request) => {
  try {
    // Extract caseId from the request body
    const { caseId } = await request.json();

    // Fetch the case with the specified caseId
    const singleCase = await db.case.findUnique({
      where: { id: caseId },
    });

    // Check if the case exists
    if (!singleCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // Fetch related data for the case
    const evidence = await db.evidence.findMany({
      where: { caseId: singleCase.id },
    });

    const suspects = await db.suspect.findMany({
      where: { caseId: singleCase.id },
    });

    const victims = await db.victim.findMany({
      where: { caseId: singleCase.id },
    });

    const witnesses = await db.witness.findMany({
      where: { caseId: singleCase.id },
    });

    const officersInCharge = await db.officer.findMany({
      where: { caseId: singleCase.id },
    });
    const notes = await db.notes.findMany({
      where: { caseId: singleCase.id },
    });

    // Combine the case with related data
    const populatedCase = {
      ...singleCase,
      evidence,
      suspects,
      notes,
      victims,
      witnesses,
      officersInCharge,
    };

    return NextResponse.json({ case: populatedCase }, { status: 200 });
  } catch (error) {
    console.error("Error fetching case:", error);
    return NextResponse.json(
      { error: "Failed to fetch case" },
      { status: 500 }
    );
  }
};
