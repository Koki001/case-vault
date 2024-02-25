import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Readable } from "stream";

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

export const POST = async (req: any, res: any) => {
  try {
    const formData = await req.formData();
    const caseId = formData.get("id");

    if (!caseId || typeof caseId !== "string") {
      return NextResponse.json({ error: "No case ID" }, { status: 400 });
    }

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME,
      Key: `evidenceFolder/reports/${caseId}/report.txt`,
    };

    const command = new GetObjectCommand(params);
    const { Body } = await s3Client.send(command);

    if (!Body) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const chunks = [];
    for await (const chunk of Body as Readable) {
      chunks.push(chunk);
    }
    const fileContents = Buffer.concat(chunks).toString("utf-8");

    return NextResponse.json({ fileContents }, { status: 201 });
  } catch (error) {
    console.error("Error retrieving file:", error);
    return NextResponse.json(
      { error: "Failed to retrieve file" },
      { status: 500 }
    );
  }
};
