import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const POST = async (request: Request) => {
  try {
    // Extract evidenceId from the request body
    const { evidenceId } = await request.json();
    console.log(evidenceId, "EVIDENCE ID")
    // Fetch the evidence with the specified evidenceId
    const singleEvidence = await db.evidence.findUnique({
      where: { id: evidenceId },
    });

    // Check if the evidence exists
    if (!singleEvidence) {
      return NextResponse.json(
        { error: "Evidence not found" },
        { status: 404 }
      );
    }

    // Fetch related data for the evidence
    if (singleEvidence.caseId) {
      const associatedCase = await db.case.findUnique({
        where: { id: singleEvidence.caseId },
      });

      const custodyEntries = await db.custodyEntry.findMany({
        where: { evidenceId: singleEvidence.id },
      });

      // Combine the evidence with related data
      const populatedEvidence = {
        ...singleEvidence,
        case: associatedCase,
        custodyEntries,
      };

      return NextResponse.json(
        { evidence: populatedEvidence },
        { status: 200 }
      );
    } else {
      const custodyEntries = await db.custodyEntry.findMany({
        where: { evidenceId: singleEvidence.id },
      });

      // Combine the evidence with related data
      const populatedEvidence = {
        ...singleEvidence,
        case: "No Associated Case",
        custodyEntries,
      };

      return NextResponse.json(
        { evidence: populatedEvidence },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching evidence details:", error);
    return NextResponse.json(
      { error: "Failed to fetch evidence details" },
      { status: 500 }
    );
  }
};
