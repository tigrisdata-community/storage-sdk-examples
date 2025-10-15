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
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{bucket.creationDate.toString()}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
