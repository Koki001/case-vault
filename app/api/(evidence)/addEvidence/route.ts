import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

  const fileExtension = fileName.split(".").pop()?.toLowerCase(); // Extract file extension
  let contentType = "application/octet-stream"; // Default content type

  // Determine content type based on file extension
  if (fileExtension === "jpg" || fileExtension === "jpeg") {
    contentType = "image/jpeg";
  } else if (fileExtension === "png") {
    contentType = "image/png";
  }

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME,
    Key: `evidenceFolder/${caseId}/${fileName}`,
    Body: fileBuffer,
    ContentType: contentType,
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
    const description = formData.get("description");
    const locationFound = formData.get("location");
    const status = formData.get("status");
    const type = formData.get("type");
    // const custodyChain = formData.get("custodyChain")

    // const { caseId, addedOn, description, locationFound, status, type, photo } =
    //   await req.json();
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name, caseId);

    const objectUrl = `https://${process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AMAZON_REGION}.amazonaws.com/evidenceFolder/${caseId}/${fileName}`;

    await db.evidence.create({
      data: {
        case: { connect: { id: caseId } },
        addedOn: new Date(),
        // custodyChain: {create: custodyChain}
        description,
        locationFound,
        status,
        type,
        photo: objectUrl,
      },
    });

    return NextResponse.json({ message: "Evidence created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating evidence:", error);
    return NextResponse.json(
      { error: "Failed to create evidence" },
      { status: 500 }
    );
  }
};
