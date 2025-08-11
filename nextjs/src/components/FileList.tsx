'use client'

import { useState } from 'react'
import Pagination from './Pagination'

interface FileItem {
  key: string
  size: number
  lastModified: string
}

interface PaginationInfo {
  currentPage: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  paginationToken: string | null
}

interface FileListProps {
  files: FileItem[]
  pagination: PaginationInfo
  onDelete: (key: string) => void
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

export default function FileList({ 
  files, 
  pagination, 
  onDelete, 
  onPageChange, 
  onItemsPerPageChange 
}: FileListProps) {
  const [deletingFiles, setDeletingFiles] = useState<Set<string>>(new Set())

  const handleDelete = async (key: string) => {
    if (!confirm('Are you sure you want to delete this file?')) {
      return
    }

    setDeletingFiles(prev => new Set(prev).add(key))
    try {
      await onDelete(key)
    } finally {
      setDeletingFiles(prev => {
        const newSet = new Set(prev)
        newSet.delete(key)
        return newSet
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Uploaded Files ({files.length} on this page)
        </h2>
      </div>
      
      {files.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          No files uploaded yet
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {files.map((file) => (
              <div key={file.key} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.key}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{formatDate(file.lastModified)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <a
                    href={`/api/download/${encodeURIComponent(file.key)}`}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleDelete(file.key)}
                    disabled={deletingFiles.has(file.key)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {deletingFiles.has(file.key) ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </>
      )}
    </div>
  )
}