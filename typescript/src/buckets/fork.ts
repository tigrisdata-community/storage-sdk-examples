import { createBucket } from "@tigrisdata/storage";

const result = await createBucket("llm-fork", {
  sourceBucketName: "llm-base", // source bucket name
});

if (result.error) {
  console.error("error creating bucket fork", result.error);
} else {
  console.log("bucket fork created");
}

const bucketName = "llm-fork";
const sourceBucketName = "llm-base"; // source bucket name
const sourceBucketSnapshotName = "fine-tuned-model"; // name of snapshot in source bucket

const fromSnapshot = await createBucket(bucketName, {
  sourceBucketName: sourceBucketName,
  sourceBucketSnapshot: sourceBucketSnapshotName,
});

if (fromSnapshot.error) {
  console.error("error creating bucket fork", fromSnapshot.error);
} else {
  console.log("bucket fork created");
}
