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

interface ClientUploadProps {
  onUploadSuccess?: () => void;
}

export function ClientUpload({ onUploadSuccess }: ClientUploadProps) {
  const [progress, setProgress] = useState<UploadProgress>({});
  const [activeUploads, setActiveUploads] = useState<Set<string>>(new Set());

  const handleFileUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    const fileNames = fileArray.map(file => file.name);

    // Track all files that are starting upload
    setActiveUploads(prev => new Set([...prev, ...fileNames]));

    const uploadPromises = fileArray.map(async (file) => {
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

        // Remove from active uploads
        setActiveUploads(prev => {
          const updated = new Set(prev);
          updated.delete(file.name);
          return updated;
        });

        return { success: true, filename: file.name };
      } catch (error) {
        setProgress((prev) => ({
          ...prev,
          [file.name]: {
            ...prev[file.name],
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error",
          },
        }));

        // Remove from active uploads
        setActiveUploads(prev => {
          const updated = new Set(prev);
          updated.delete(file.name);
          return updated;
        });

        return { success: false, filename: file.name };
      }
    });

    // Wait for all uploads to complete
    const results = await Promise.allSettled(uploadPromises);

    // Remove completed uploads after 2 seconds and refresh the list
    setTimeout(() => {
      const successfulUploads = results
        .filter((result): result is PromiseFulfilledResult<{ success: boolean; filename: string }> =>
          result.status === 'fulfilled' && result.value.success
        )
        .map(result => result.value.filename);

      if (successfulUploads.length > 0) {
        setProgress((prev) => {
          const updated = { ...prev };
          successfulUploads.forEach(filename => {
            delete updated[filename];
          });
          return updated;
        });

        onUploadSuccess?.();
      }
    }, 2000);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Client Upload</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="client-upload" className="block text-sm font-medium text-gray-700">
            Choose files to upload
          </label>
          <input
            id="client-upload"
            type="file"
            multiple
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {Object.entries(progress).length > 0 && (
          <div className="space-y-3">
            {Object.entries(progress).map(([filename, prog]) => (
              <div key={filename} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate pr-4">
                    {filename}
                  </h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    prog.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : prog.status === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {prog.status === "uploading" ? `${Math.round(prog.percentage)}%` : prog.status}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      prog.status === "error" ? "bg-red-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {prog.loaded ? `${(prog.loaded / 1024 / 1024).toFixed(2)} MB` : "0 MB"} / {(prog.total / 1024 / 1024).toFixed(2)} MB
                  </span>
                  {prog.status === "uploading" && (
                    <span>{Math.round(prog.percentage)}%</span>
                  )}
                </div>

                {prog.url && (
                  <div className="mt-3">
                    <a
                      href={prog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View File
                    </a>
                  </div>
                )}

                {prog.error && (
                  <div className="mt-2 text-sm text-red-600">
                    Error: {prog.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
