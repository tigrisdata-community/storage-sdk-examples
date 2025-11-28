"use client";

import { BucketDetails } from "@/components/BucketDetails";
import { useParams } from "next/navigation";

export default function BucketPage() {
  const { bucket } = useParams();
  return <BucketDetails bucket={bucket?.toString()} />;
}
