import { createBucket } from "@tigrisdata/storage";

const fork = await createBucket("llm-base-fork", {
  sourceBucketName: "llm-base", // source bucket name
  sourceBucketSnapshot: "1760701474278618710", // optional, snapshot version of source bucket
});

if (fork.error) {
  console.error("error creating bucket fork", fork.error);
} else {
  console.log("bucket fork created", fork.data);
}
