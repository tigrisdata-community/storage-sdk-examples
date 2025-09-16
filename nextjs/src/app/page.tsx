"use client";

import { useState, useEffect, useCallback } from "react";
import FileUpload from "@/components/FileUpload";
import FileList from "@/components/FileList";
import { ClientUpload } from "@/components/ClientUpload";

interface FileItem {
  key: string;
  size: number;
  lastModified: string;
}

interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  paginationToken: string | null;
}

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
    paginationToken: null,
  });
  const [paginationStack, setPaginationStack] = useState<string[]>([]); // Stack to track pagination tokens for going back

  const fetchFiles = useCallback(
    async (page = 1, limit = 10, paginationMarker?: string) => {
      try {
        setLoading(true);
        const url = new URL("/api/files", window.location.origin);
        url.searchParams.set("page", page.toString());
        url.searchParams.set("limit", limit.toString());
        if (paginationMarker) {
          url.searchParams.set("paginationMarker", paginationMarker);
        }

        const response = await fetch(url.toString());
        if (response.ok) {
          const data = await response.json();
          setFiles(data.files);
          setPagination(data.pagination);
        } else {
          console.error("Failed to fetch files");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleDelete = async (key: string) => {
    try {
      const response = await fetch(
        `/api/files?key=${encodeURIComponent(key)}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Refresh the current page after deletion
        const currentMarker =
          paginationStack.length > 0
            ? paginationStack[paginationStack.length - 1]
            : undefined;
        await fetchFiles(
          pagination.currentPage,
          pagination.itemsPerPage,
          currentMarker
        );
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete file. Please try again.");
    }
  };

  const handlePageChange = (page: number) => {
    if (page > pagination.currentPage) {
      // Going forward - use the pagination token
      if (pagination.paginationToken) {
        setPaginationStack((prev) => [...prev, pagination.paginationToken!]);
        fetchFiles(page, pagination.itemsPerPage, pagination.paginationToken);
      }
    } else {
      // Going backward - pop from the stack
      const newStack = [...paginationStack];
      newStack.pop();
      setPaginationStack(newStack);
      const prevMarker =
        newStack.length > 0 ? newStack[newStack.length - 1] : undefined;
      fetchFiles(page, pagination.itemsPerPage, prevMarker);
    }
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setPaginationStack([]);
    fetchFiles(1, itemsPerPage); // Reset to page 1 when changing items per page
  };

  const handleUploadSuccess = () => {
    const currentMarker =
      paginationStack.length > 0
        ? paginationStack[paginationStack.length - 1]
        : undefined;
    fetchFiles(pagination.currentPage, pagination.itemsPerPage, currentMarker);
  };

  useEffect(() => {
    fetchFiles(1, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-4xl mx-auto">
        <ClientUpload />
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        <FileList
          files={files}
          pagination={pagination}
          onDelete={handleDelete}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}
