import { Uploader } from "@tigrisdata/react";
import "@tigrisdata/react/styles.css"; // Optional: import default styles

export function ClientUpload({ bucket }: { bucket?: string }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-2">Client Uploads</h2>
      <Uploader
        className="mt-4 tigris-uploader"
        multiple={true}
        multipart={true}
        concurrency={3}
        url={`/api/upload?bucket=${bucket}`}
        onUploadComplete={(file, response) => {
          console.log("Uploaded:", response.url);
        }}
        onUploadError={(file, error) => {
          console.error("Failed:", error.message);
        }}
      />
    </div>
  );
}
