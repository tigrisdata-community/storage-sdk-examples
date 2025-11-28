import { put, handleClientUpload } from "@tigrisdata/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileName = file.name;

    await put(fileName, file, {
      access: "public",
      addRandomSuffix: true,
      ...(bucket ? { config: { bucket } } : {}),
    });

    return NextResponse.json({
      success: true,
      fileName,
      message: "File uploaded successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bucket = request.nextUrl.searchParams.get("bucket") as string;
    const { data, error } = await handleClientUpload(body, {
      ...(bucket ? { bucket } : {}),
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process upload request" },
      { status: 500 }
    );
  }
}
