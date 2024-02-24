import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Function to retrieve the highest existing case number from the database
async function getNextCaseNumber() {
  const highestCase = await db.case.findFirst({
    orderBy: { caseNumber: "desc" },
  });

  // If there are no existing cases, start with case number 1
  if (!highestCase) {
    return 1;
  }

  // Otherwise, increment the highest case number
  return highestCase.caseNumber + 1;
}

export const POST = async (req: any) => {
  try {
    const {
      description,
      type,
      // report,
      status,
      suspects,
      victims,
      witnesses,
      officerInCharge,
    } = await req.json();

    // Map each array of names to an array of objects with the 'create' key
    const suspectsData = suspects.map((name: string) => ({ name }));
    const victimsData = victims.map((name: string) => ({ name }));
    const witnessesData = witnesses.map((name: string) => ({ name }));
    const officerInChargeData = officerInCharge.map((name: string) => ({
      name,
    }));

    // Get the next available case number
    const caseNumber = await getNextCaseNumber();

    // Create the case with the mapped data and the calculated case number
    const createdCase = await db.case.create({
      data: {
        caseNumber,
        description,
        // report,
        type,
        status,
        createdAt: new Date(),
        suspects: { create: suspectsData },
        victims: { create: victimsData },
        witnesses: { create: witnessesData },
        officerInCharge: { create: officerInChargeData },
      },
    });

    return NextResponse.json(
      { message: "Case Added", caseId: createdCase.id },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
