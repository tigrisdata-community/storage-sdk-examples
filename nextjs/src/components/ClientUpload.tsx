import React, { useState } from "react";
import { upload } from "@tigrisdata/storage/client";

interface UploadProgress {
  [filename: string]: {
    percentage: number;
    loaded: number;
    total: number;
    status: "uploading" | "completed" | "error";
    url?: string;
    error?: string;
  };
}

export function ClientUpload() {
  const [progress, setProgress] = useState<UploadProgress>({});

  const handleFileUpload = async (files: FileList) => {
    for (const file of Array.from(files)) {
      // Initialize progress
      setProgress((prev) => ({
        ...prev,
        [file.name]: {
          percentage: 0,
          loaded: 0,
          total: file.size,
          status: "uploading",
        },
      }));

      try {
        const result = await upload(`uploads/${file.name}`, file, {
          url: "/api/signed",
          access: "public",
          addRandomSuffix: true,
          onUploadProgress: ({ loaded, total, percentage }) => {
            setProgress((prev) => ({
              ...prev,
              [file.name]: {
                ...prev[file.name],
                percentage,
                loaded,
                total,
              },
            }));
          },
        });

        // Mark as completed
        setProgress((prev) => ({
          ...prev,
          [file.name]: {
            ...prev[file.name],
            status: "completed",
            url: result.url,
          },
        }));
      } catch (error) {
        setProgress((prev) => ({
          ...prev,
          [file.name]: {
            ...prev[file.name],
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error",
          },
        }));
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
      />

      {Object.entries(progress).map(([filename, prog]) => (
        <div
          key={filename}
          style={{
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h4>{filename}</h4>
          <div
            style={{
              width: "100%",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                width: `${prog.percentage}%`,
                backgroundColor:
                  prog.status === "error" ? "#ff4444" : "#4caf50",
                height: "20px",
                borderRadius: "4px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <p>
            {prog.percentage}% - {prog.status}
          </p>
          {prog.url && (
            <a href={prog.url} target="_blank">
              View File
            </a>
          )}
          {prog.error && <p style={{ color: "red" }}>Error: {prog.error}</p>}
        </div>
      ))}
    </div>
  );
}
