import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Fetch all cases from the database
    const cases = await db.case.findMany({
      orderBy: {createdAt: "desc"}
    });

    // Fetch related data for each case
    const populatedCases = await Promise.all(
      cases.map(async (c) => {

        const evidence = await db.evidence.findMany({
          where: { caseId: c.id },
        });

        const suspects = await db.suspect.findMany({
          where: { caseId: c.id },
        });

        const victims = await db.victim.findMany({
          where: { caseId: c.id },
        });

        const witnesses = await db.witness.findMany({
          where: { caseId: c.id },
        });

        const officersInCharge = await db.officer.findMany({
          where: { caseId: c.id },
        });


        return {
          ...c,
          evidence,
          suspects,
          victims,
          witnesses,
          officersInCharge,
        };
      })
    );
      console.log(populatedCases)
    return NextResponse.json({ cases: populatedCases }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
};
