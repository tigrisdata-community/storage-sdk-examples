"use client";

import { List } from "@/components/List";
import { Upload } from "@/components/Upload";
import { ClientUpload } from "@/components/ClientUpload";

export default function Home() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <Upload />
      <ClientUpload />
      <List />
    </div>
  );
}
