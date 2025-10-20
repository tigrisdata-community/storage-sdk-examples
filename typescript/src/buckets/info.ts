import { getBucketInfo } from "@tigrisdata/storage";

const bucketInfo = await getBucketInfo("llm-base");

if (bucketInfo.error) {
  console.error("error getting bucket info", bucketInfo.error);
} else {
  console.log("bucket info", bucketInfo.data);
}
