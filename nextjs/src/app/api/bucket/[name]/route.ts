import { removeBucket } from "@tigrisdata/storage";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;

    if (!name) {
      return NextResponse.json(
        { error: "No bucket name provided" },
        { status: 400 }
      );
    }

    const result = await removeBucket(decodeURIComponent(name));

    if (result.error) {
      console.error("Failed to delete bucket", result.error);
      return NextResponse.json(
        { error: "Failed to delete bucket" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Bucket deleted successfully",
    });
  } catch (error) {
    console.error("Delete bucket error:", error);
    return NextResponse.json(
      { error: "Failed to delete bucket" },
      { status: 500 }
    );
  }
}
