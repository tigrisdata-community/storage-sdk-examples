import { createBucketSnapshot, listBucketSnapshots } from "@tigrisdata/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const result = await listBucketSnapshots(decodeURIComponent(name));
  if (!result || result.error) {
    return NextResponse.json({ error: "Snapshots not found" }, { status: 404 });
  }
  return NextResponse.json(result.data);
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const result = await createBucketSnapshot(decodeURIComponent(name));
  return NextResponse.json(result.data);
}
