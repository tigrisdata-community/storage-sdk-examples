import { getBucketInfo } from "@tigrisdata/storage";

const { data, error } = await getBucketInfo("llm-base");

if (error) {
  console.error("error getting bucket info", error);
} else {
  console.log("bucket info", data);
}
