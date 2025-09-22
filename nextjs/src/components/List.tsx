"use client";

import { formatDate, formatFileSize } from "@/app/utils/formatters";
import { Item, ListResponse } from "@tigrisdata/storage";
import { useCallback, useEffect, useState } from "react";

export function List() {
  const [objects, setObjects] = useState<Item[]>([]);
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [limit] = useState<number>(10);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this object?")) {
      return;
    }

    await fetch(`/api/object/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    setObjects((existingObjects) =>
      existingObjects.filter((object) => object.id !== id)
    );
  }, []);

  const loadObjects = useCallback(
    async (paginationToken?: string) => {
      setLoading(true);

      const response = await fetch(
        `/api/list?limit=${limit}` +
          (paginationToken ? `&paginationToken=${paginationToken}` : ""),
        {
          method: "GET",
        }
      );

      if (response.ok) {
        setLoading(false);
        const data: ListResponse = await response.json();
        setObjects((existingObjects) => existingObjects.concat(data.items));
        setNextToken(data.paginationToken ?? undefined);
      } else {
        console.error("Failed to fetch objects");
      }
    },
    [limit]
  );

  useEffect(() => {
    loadObjects();
  }, [loadObjects]);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Uploaded Objects ({objects?.length} on this page)
        </h2>
      </div>

      {objects?.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          No objects uploaded yet
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {objects?.map((object) => (
              <div
                key={object.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {object.name}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatFileSize(object.size)}</span>
                    <span>{formatDate(object.lastModified.toString())}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={`/api/object/${encodeURIComponent(object.id)}`}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleDelete(object.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {nextToken && (
            <div className="px-6 py-4 text-center text-gray-500 border-t border-gray-200">
              <button
                onClick={() => loadObjects(nextToken)}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
