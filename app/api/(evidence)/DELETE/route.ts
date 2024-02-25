// Import necessary dependencies
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

const deleteCaseAndAssociatedRecords = async (caseId: string) => {
  try {
    // Delete associated records from other collections
    await db.evidence.deleteMany({ where: { caseId } });
    await db.suspect.deleteMany({ where: { caseId } });
    await db.victim.deleteMany({ where: { caseId } });
    await db.witness.deleteMany({ where: { caseId } });
    await db.officer.deleteMany({ where: { caseId } });
    await db.notes.deleteMany({ where: { caseId } });

    // Delete the Case itself
    await db.case.delete({ where: { id: caseId } });

    return { success: true };
  } catch (error) {
    console.error("Error deleting case and associated records:", error);
    throw new Error("Failed to delete case and associated records");
  }
};

// Usage example:
export const POST = async (req: any) => {
  try {
    // const caseId = "";

    // Call the delete function
    // await deleteCaseAndAssociatedRecords(caseId);

    // Return success response
    return NextResponse.json(
      { message: "Case and associated records deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting case and associated records:", error);
    return NextResponse.json(
      { error: "Failed to delete case and associated records" },
      { status: 500 }
    );
  }
};
