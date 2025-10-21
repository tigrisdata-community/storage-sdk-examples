"use client";

import { BucketDetails } from "@/components/BucketDetails";
import { useParams } from "next/navigation";

export default function BucketPage() {
  const { name } = useParams();
  return <BucketDetails name={name as string} />;
}
