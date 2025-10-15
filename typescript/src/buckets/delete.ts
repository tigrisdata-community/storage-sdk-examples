import { removeBucket } from "@tigrisdata/storage";

const result = await removeBucket("llm-base");

if (result.error) {
  console.error("error deleting bucket", result.error);
} else {
  console.log("bucket deleted");
}
