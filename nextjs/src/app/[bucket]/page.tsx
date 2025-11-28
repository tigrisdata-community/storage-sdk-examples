"use client";

import { useParams } from "next/navigation";
import { List } from "@/components/List";
import { Upload } from "@/components/Upload";
import { ClientUpload } from "@/components/ClientUpload";

export default function Home() {
  const { bucket } = useParams();
  return (
    <div className="px-4 py-6 sm:px-0">
      <Upload bucket={bucket?.toString()} />
      <ClientUpload bucket={bucket?.toString()} />
      <List bucket={bucket?.toString()} />
    </div>
  );
}
