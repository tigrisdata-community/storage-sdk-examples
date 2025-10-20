import { createBucketSnapshot } from "@tigrisdata/storage";

const snapshot = await createBucketSnapshot("llm-base", {
  name: "pre-fine-tuned-model", // optional name of the snapshot
});

if (snapshot.error) {
  console.error("error creating bucket snapshot", snapshot.error);
} else {
  console.log("bucket snapshot created", snapshot.data);
}
