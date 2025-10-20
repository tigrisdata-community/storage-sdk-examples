import { createBucket } from "@tigrisdata/storage";

const result = await createBucket("llm-base", {
  enableSnapshot: true,
});

if (result.error) {
  console.error("error creating bucket", result.error);
} else {
  console.log("bucket created", result.data);
}
