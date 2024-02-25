// Import necessary dependencies

import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/lib/db";

if (
  !process.env.NEXT_PUBLIC_AMAZON_REGION ||
  !process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID ||
  !process.env.NEXT_PUBLIC_AMAZON_SECRET_KEY
) {
  throw new Error(
    "Missing required environment variables for AWS S3 client configuration."
  );
}
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AMAZON_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AMAZON_SECRET_KEY,
  },
});

const uploadFileToS3 = async (file: any, fileName: any, caseId: string) => {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME,
    Key: `evidenceFolder/reports/${caseId}/${fileName}`,
    Body: fileBuffer,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
};

export const POST = async (req: any) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const caseId = formData.get("caseId");
    console.log(caseId, "CASE ID INSIDE OF ROUTE");
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name, caseId);

    const objectUrl = `https://${process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AMAZON_REGION}.amazonaws.com/evidenceFolder/report/${caseId}/${fileName}`;

    await db.case.update({
      where: {
        id: caseId,
      },
      data: {
        report: objectUrl,
      },
    });

    return NextResponse.json({ message: { objectUrl } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
