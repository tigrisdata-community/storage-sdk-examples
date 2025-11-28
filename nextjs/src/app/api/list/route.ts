import { list } from "@tigrisdata/storage";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const paginationToken = searchParams.get("paginationToken") ?? undefined;
    const bucket = searchParams.get("bucketName") ?? undefined;

    const response = await list({
      limit,
      paginationToken,
      config: {
        bucket,
      },
    });

    if (response.error) {
      return NextResponse.json(
        { error: response.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("List files error:", error);
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}
