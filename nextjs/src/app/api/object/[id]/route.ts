import { get, remove } from "@tigrisdata/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await get(decodeURIComponent(id), "file", {
      contentDisposition: "attachment",
    });

    if (!response || response.error) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Set appropriate headers
    const headers = new Headers({
      "Content-Type": response.data?.type || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${decodeURIComponent(id)}"`,
    });

    return new NextResponse(response.data, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to download object" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bucket = request.nextUrl.searchParams.get("bucket") ?? undefined;

    if (!id) {
      return NextResponse.json(
        { error: "No file id provided" },
        { status: 400 }
      );
    }

    await remove(decodeURIComponent(id), {
      config: {
        ...(bucket ? { bucket } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Object deleted successfully",
    });
  } catch (error) {
    console.error("Delete object error:", error);
    return NextResponse.json(
      { error: "Failed to delete object" },
      { status: 500 }
    );
  }
}
