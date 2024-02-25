import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import mammoth from "mammoth"; // Import mammoth.js
import path from "path";

// Check for required environment variables
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

    const listParams = {
      Bucket: process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME,
      Prefix: `evidenceFolder/reports/${caseId}/`,
    };

    const listCommand = new ListObjectsCommand(listParams);
    const { Contents } = await s3Client.send(listCommand);

    if (!Contents || Contents.length === 0) {
      return NextResponse.json({ error: "No files found" }, { status: 404 });
    }

    // Get the first file found
    const firstFile = Contents[0];
    if (!firstFile || !firstFile.Key) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    const firstFileName = firstFile.Key.split("/").pop(); // Extracting the file name
    if (!firstFileName) {
      return;
    }
    const fileExtension = path.extname(firstFileName);

    console.log(caseId);
    const getParams = {
      Bucket: process.env.NEXT_PUBLIC_AMAZON_BUCKET_NAME,
      Key: firstFile.Key,
    };

    const getCommand = new GetObjectCommand(getParams);
    const { Body, ContentType } = await s3Client.send(getCommand);

    if (!Body) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const chunks = [];
    for await (const chunk of Body as Readable) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    // Check if the content type indicates a Word document
    if (fileExtension === ".txt") {
      const fileContents = buffer.toString("utf-8");
      return NextResponse.json(
        { fileName: firstFileName, fileContents },
        { status: 201 }
      );
    } else {
      const { value } = await mammoth.convertToHtml({ buffer });
      return NextResponse.json(
        { fileName: firstFileName, fileContents: value },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error retrieving file:", error);
    return NextResponse.json(
      { error: "Failed to retrieve file" },
      { status: 500 }
    );
  }
};
