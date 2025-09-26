import {
  getPresignedUrl,
  put,
  initMultipartUpload,
  getPartsPresignedUrls,
  completeMultipartUpload,
  UploadAction,
} from "@tigrisdata/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileName = file.name;

    await put(fileName, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      success: true,
      fileName,
      message: "File uploaded successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { path, action, contentType, uploadId, parts, partIds } =
      await request.json();

    switch (action) {
      case UploadAction.SinglepartInit: {
        const result = await getPresignedUrl(path, {
          contentType,
          operation: "put",
          expiresIn: 3600, // 1 hour
        });
        return NextResponse.json({ data: result.data });
      }

      case UploadAction.MultipartInit: {
        const result = await initMultipartUpload(path, {});
        return NextResponse.json({ data: result.data });
      }

      case UploadAction.MultipartGetParts: {
        if (!uploadId || !parts) {
          return NextResponse.json(
            { error: "uploadId and parts are required for multipart-parts" },
            { status: 400 }
          );
        }
        const result = await getPartsPresignedUrls(path, parts, uploadId, {});
        return NextResponse.json({ data: result.data });
      }

      case UploadAction.MultipartComplete: {
        if (!uploadId) {
          return NextResponse.json(
            { error: "uploadId is required for multipart-complete" },
            { status: 400 }
          );
        }
        const result = await completeMultipartUpload(path, uploadId, partIds);
        return NextResponse.json({ data: result.data });
      }

      default:
        return NextResponse.json(
          { error: `Unsupported operation: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process upload request" },
      { status: 500 }
    );
  }
}
