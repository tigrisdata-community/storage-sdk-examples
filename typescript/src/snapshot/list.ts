import { listBucketSnapshots } from "@tigrisdata/storage";

const bucketSnapshots = await listBucketSnapshots("bucket-ai-1760700726474");

if (bucketSnapshots.error) {
  console.error("error listing bucket snapshots", bucketSnapshots.error);
} else {
  console.log("bucket snapshots", bucketSnapshots.data);
}
