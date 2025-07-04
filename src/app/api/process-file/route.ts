import { getUserFromRequest } from "@/lib/auth";
import { createLabReport } from "@/lib/reports";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Send file to FastAPI microservice
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);

    const response = await fetch(
      `${process.env.FASTAPI_URL}/process-document`,
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Failed to process document" },
        { status: response.status }
      );
    }

    const result = await response.json();

    // If no parameters are found, do not store in DB and return error
    if (!result.parameters || result.parameters.length === 0) {
      return NextResponse.json(
        { message: "Please upload a valid report. No health parameters found." },
        { status: 400 }
      );
    }

    const { parameters } = await createLabReport(
      user?.id,
      file.name,
      file.type,
      file.size,
      result.text,
      result.parameters
    );

    return NextResponse.json({
      message: "File processed successfully",
      extractedTextLength: result.text?.length || 0,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      parameters: parameters,
    });
  } catch (error) {
    console.error("Upload processing error:", error);
    return NextResponse.json(
      {
        message: `Failed to process file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
