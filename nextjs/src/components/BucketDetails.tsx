import { formatDate } from "@/app/utils/formatters";
import type {
  BucketInfoResponse,
  ListBucketSnapshotsResponse,
} from "@tigrisdata/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function BucketDetails({ name }: { name: string }) {
  const router = useRouter();
  const [bucketInfo, setBucketInfo] = useState<BucketInfoResponse | null>(null);
  const [snapshots, setSnapshots] =
    useState<ListBucketSnapshotsResponse | null>(null);

  const loadInfo = async (name: string) => {
    const response = await fetch(`/api/bucket/${encodeURIComponent(name)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      setBucketInfo(data);
    }
  };

  const loadSnapshots = async (name: string) => {
    const response = await fetch(
      `/api/bucket/${encodeURIComponent(name)}/snapshots`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setSnapshots(data);
    }
  };

  useEffect(() => {
    loadInfo(name);
  }, [name]);

  useEffect(() => {
    if (bucketInfo && bucketInfo.isSnapshotEnabled) {
      loadSnapshots(name);
    }
  }, [bucketInfo, name]);

  return (
    <>
      <div className="bg-white shadow rounded-lg mt-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Bucket Details: {name}
          </h2>
        </div>
        {bucketInfo ? (
          <div className="divide-y divide-gray-200">
            <ul className="px-6 py-4 flex items-center justify-between">
              <li>Is Snapshot Enabled</li>
              <li>{bucketInfo.isSnapshotEnabled ? "Yes" : "No"}</li>
            </ul>
            <ul className="px-6 py-4 flex items-center justify-between">
              <li>Has Forks</li>
              <li>{bucketInfo.hasForks ? "Yes" : "No"}</li>
            </ul>
            {bucketInfo.sourceBucketName ? (
              <ul className="px-6 py-4 flex items-center justify-between">
                <li>Source Bucket Name</li>
                <li>
                  <Link
                    href={`/buckets/${encodeURIComponent(
                      bucketInfo.sourceBucketName
                    )}`}
                  >
                    {bucketInfo.sourceBucketName}
                  </Link>
                </li>
              </ul>
            ) : null}
            {bucketInfo.sourceBucketSnapshot ? (
              <ul className="px-6 py-4 flex items-center justify-between">
                <li>Source Bucket Snapshot</li>
                <li>{bucketInfo.sourceBucketSnapshot}</li>
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>

      {snapshots ? (
        <div className="bg-white shadow rounded-lg mt-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-md font-medium text-gray-900">Snapshots</h3>
          </div>
          {snapshots.length > 0 ? (
            <div className="divide-y">
              {snapshots.map((snapshot) => (
                <div
                  key={snapshot.version}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="text-sm text-gray-500">
                    {snapshot.version}{" "}
                    {snapshot.name ? ` - (${snapshot.name})` : ""}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(snapshot.creationDate?.toString() ?? "")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-4 text-center text-gray-500">
              No snapshots found
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
