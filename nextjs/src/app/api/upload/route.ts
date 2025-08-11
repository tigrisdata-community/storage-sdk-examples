import { NextRequest, NextResponse } from "next/server";
import { put, config } from "@/lib/tigris";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileName = file.name;

    console.log({ fileName });

    await put(fileName, file, {
      config,
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      success: true,
      fileName,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
