import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const formData = await req.formData();
    const caseId = formData.get("caseId");
    const evidenceType = formData.get("evidenceType");
    const evidenceStatus = formData.get("evidenceStatus");
    const earliestDate = formData.get("evidenceEarliest");
    const latestDate = formData.get("evidenceLatest");

    const filters: any = {};

    // Constructing filters based on provided form data
    if (caseId) filters.caseId = caseId;
    if (evidenceType) filters.type = evidenceType;
    if (evidenceStatus) filters.status = evidenceStatus;
    if (earliestDate && latestDate) {
      filters.addedOn = {
        gte: new Date(earliestDate),
        lte: new Date(latestDate),
      };
    } else {
      if (earliestDate) filters.addedOn = { gte: new Date(earliestDate) };
      if (latestDate) filters.addedOn = { lte: new Date(latestDate) };
    }

    const evidence = await db.evidence.findMany({ where: filters });

    return NextResponse.json({ evidence }, { status: 201 });
  } catch (error) {
    console.error("Error fetching specific evidence:", error);
    return NextResponse.json(
      { error: "Failed to fetch specific evidence" },
      { status: 500 }
    );
  }
};
