import { NextRequest, NextResponse } from "next/server";
import { getPresignedUrl, config } from "@/lib/tigris";

export async function POST(request: NextRequest) {
  try {
    const { path, method, contentType } = await request.json();
    console.log(path, contentType);
    const result = await getPresignedUrl(path, {
      method,
      contentType,
      expiresIn: 3600, // 1 hour
    });

    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}
