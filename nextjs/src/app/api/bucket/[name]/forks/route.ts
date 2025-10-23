import { createBucket } from "@tigrisdata/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  const body = await request.json();

  const result = await createBucket(
    `${decodeURIComponent(name)}-fork-${Date.now()}`,
    {
      sourceBucketName: decodeURIComponent(name),
      sourceBucketSnapshot: body.version ?? undefined,
    }
  );
  return NextResponse.json(result.data);
}
