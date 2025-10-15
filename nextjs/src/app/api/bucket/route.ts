import { listBuckets } from "@tigrisdata/storage";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await listBuckets();

    if (!response || response.error) {
      return NextResponse.json({ error: "Buckets not found" }, { status: 404 });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list buckets" },
      { status: 500 }
    );
  }
}
