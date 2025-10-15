import { formatDate } from "@/app/utils/formatters";
import { Bucket } from "@tigrisdata/storage";
import { useEffect, useState } from "react";

export function BucketList() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBuckets = async () => {
    const response = await fetch("/api/bucket");
    const data = await response.json();
    if (response.ok) {
      setBuckets(data.buckets);
    } else {
      setError(data.error);
    }
  };

  useEffect(() => {
    fetchBuckets();
  }, []);

  const handleDelete = async (name: string) => {
    if (!confirm("Are you sure you want to delete this bucket?")) {
      return;
    }

    await fetch(`/api/bucket/${encodeURIComponent(name)}`, {
      method: "DELETE",
    });

    setBuckets((existingBuckets) =>
      existingBuckets.filter((bucket) => bucket.name !== name)
    );
  };

  return (
    <div className="bg-white shadow rounded-lg mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Buckets ({buckets?.length})
        </h2>
      </div>

      {error && <div className="px-6 py-4 text-red-500">{error}</div>}

      {buckets?.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          No buckets uploaded yet
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {buckets.map((bucket) => (
              <div
                key={bucket.name}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {bucket.name}
                  </p>
                  <span className="flex items-center space-x-4 text-sm text-gray-500">
                    {formatDate(bucket.creationDate.toString())}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button
                    onClick={() => handleDelete(bucket.name)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
