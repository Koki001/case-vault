import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const formData = await req.formData();
    const caseId = formData.get("caseId");
    const caseNumberString = formData.get("caseNo");
    const caseNumber = parseInt(caseNumberString);
    const type = formData.get("caseType");
    const startDate = formData.get("caseEarliest"); // Renamed to startDate
    const endDate = formData.get("caseLatest"); // Renamed to endDate

    const filters: any = {};

    // Constructing filters based on provided form data
    if (caseId) filters.id = caseId;
    if (caseNumber) filters.caseNumber = caseNumber; // Renamed to caseNumber
    if (type) filters.type = type; // Renamed to type
    if (startDate && endDate) {
      filters.createdAt = {
        gte: startDate,
        lte: endDate,
      };
    } else {
      if (startDate) filters.createdAt = { gte: startDate };
      if (endDate) filters.createdAt = { lte: endDate };
    }

    const cases = await db.case.findMany({ where: filters });
    console.log(endDate);
    const populatedCases = await Promise.all(
      cases.map(async (c) => {
        const [evidence, suspects, victims, witnesses, officersInCharge] =
          await Promise.all([
            db.evidence.findMany({ where: { caseId: c.id } }),
            db.suspect.findMany({ where: { caseId: c.id } }),
            db.victim.findMany({ where: { caseId: c.id } }),
            db.witness.findMany({ where: { caseId: c.id } }),
            db.officer.findMany({ where: { caseId: c.id } }),
          ]);

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

    return NextResponse.json({ populatedCases }, { status: 201 });
  } catch (error) {
    console.error("Error fetching specific cases:", error);
    return NextResponse.json(
      { error: "Failed to create specific cases" },
      { status: 500 }
    );
  }
};
