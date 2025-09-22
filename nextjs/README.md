# Tigris Storage SDK / Next.js Example App

A minimal Next.js application for uploading, listing, and deleting objects using Tigris Storage SDK.

## Features

- 📁 Object upload using Tigris storage SDK
- 📋 List all uploaded objects
- 🗑️ Delete files from storage
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
   TIGRIS_STORAGE_ACCESS_KEY_ID=your-tigris-key-id
   TIGRIS_STORAGE_SECRET_ACCESS_KEY=your-tigris-access-key
   TIGRIS_STORAGE_BUCKET=your-bucket-name
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload Files:** Click "Choose file" to select a file, then click "Upload"
2. **View Files:** Objects are displayed
3. **Download Files:** Click the "Download" button next to any file
4. **Delete Files:** Click the "Delete" button to remove files from storage

## API Endpoints

- `GET /api/list?paginationToken=token` - Lists all the objects
- `GET /api/object` - Get the object
- `DELETE /api/object/[id]` - Delete a file
- `GET /api/object/[id]` - Download a file
- `POST /api/upload` - Client side uploads
- `PUT /api/upload` - Server side uploads
