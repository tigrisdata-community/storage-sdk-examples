import { listBuckets } from "@tigrisdata/storage";

const result = await listBuckets();

if (result.error) {
  console.error("error listing buckets", result.error);
} else {
  console.log(result.data);
}
