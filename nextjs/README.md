# Tigris File Upload Next.js App

A minimal Next.js application for uploading, listing, and deleting files using Tigris storage.

## Features

- 📁 File upload to Tigris storage
- 📋 List all uploaded files with pagination
- 🗑️ Delete files from storage
- 📄 Configurable items per page (5, 10, 20, 50)
- ⏭️ Next/Previous page navigation
- 📱 Responsive design with Tailwind CSS
- ⚡ Built with Next.js App Router

## Prerequisites

- Node.js 18+ and npm
- Tigris account and bucket

## Setup

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env` and update with your Tigris credentials:

   ```bash
   NEXT_PUBLIC_TIGRIS_STORAGE_ACCESS_KEY_ID=your-tigris-key-id
   NEXT_PUBLIC_TIGRIS_STORAGE_SECRET_ACCESS_KEY=your-tigris-access-key
   NEXT_PUBLIC_TIGRIS_STORAGE_BUCKET=your-bucket-name
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload Files:** Click "Choose file" to select a file, then click "Upload"
2. **View Files:** Files are displayed with pagination (default: 10 per page)
3. **Navigate Pages:** Use the Previous/Next buttons to navigate through pages
4. **Change Page Size:** Use the dropdown to show 5, 10, 20, or 50 files per page
5. **Download Files:** Click the "Download" button next to any file
6. **Delete Files:** Click the "Delete" button to remove files from storage

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── upload/route.ts      # File upload endpoint
│   │   ├── files/route.ts       # List/delete files endpoint
│   │   └── download/[key]/route.ts # File download endpoint
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── components/
│   ├── FileUpload.tsx           # File upload component
│   ├── FileList.tsx             # File list component
│   └── Pagination.tsx           # Pagination component
└── lib/
    └── tigris.ts                # Tigris client configuration
```

## API Endpoints

- `POST /api/upload` - Upload a file
- `GET /api/files?page=1&limit=10&paginationMarker=token` - List files with pagination
- `DELETE /api/files?key=filename` - Delete a file
- `GET /api/download/[key]` - Download a file

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **@tigrisdata/storage** - Tigris storage client
