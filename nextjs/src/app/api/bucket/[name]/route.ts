import { getBucketInfo, removeBucket } from "@tigrisdata/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const result = await getBucketInfo(decodeURIComponent(name));
  if (!result || result.error) {
    return NextResponse.json({ error: "Bucket not found" }, { status: 404 });
  }
  return NextResponse.json(result.data);
}

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
