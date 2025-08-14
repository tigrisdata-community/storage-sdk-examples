import { NextResponse } from "next/server";
import { config, list, remove } from "@/lib/tigris";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const paginationMarker = searchParams.get("paginationMarker") || undefined;

    const response = await list({
      limit,
      paginationMarker,
      config,
    });

    if (response.error || !response.data) {
      return NextResponse.json({
        files: [],
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          hasNextPage: false,
          hasPreviousPage: false,
          paginationToken: null,
        },
      });
    }

    const items = response.data.items || [];
    const files = items.map((object) => ({
      key: object.name || "",
      size: object.size || 0,
      lastModified:
        object.lastModified?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json({
      files,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        hasNextPage: response.data.hasMore || false,
        hasPreviousPage: page > 1,
        paginationToken: response.data.paginationToken || null,
      },
    });
  } catch (error) {
    console.error("List files error:", error);
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { error: "No file key provided" },
        { status: 400 }
      );
    }

    await remove(key, { config });

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete file error:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
