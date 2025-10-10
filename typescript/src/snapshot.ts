import { createBucketSnapshot, listBucketSnapshots } from "@tigrisdata/storage";

// List snapshots of a given bucket
const list = await listBucketSnapshots("llm-base");

if (list.error) {
  console.error("error listing bucket snapshots", list.error);
} else {
  console.log("bucket snapshots", list.data);
}

// Create a new snapshot
const result = await createBucketSnapshot("llm-base", {
  name: "fine-tuned-xxxx", // optional name of the snapshot
});

if (result.error) {
  console.error("error creating bucket snapshot", result.error);
} else {
  console.log("bucket snapshot created");
}
