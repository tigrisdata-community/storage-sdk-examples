import { createBucket } from "@tigrisdata/storage";

const { data, error } = await createBucket("llm-base", {
  locations: {
    type: "dual",
    values: ["ams", "fra"],
  },
});

if (error) {
  console.error("error creating bucket", error);
} else {
  console.log("bucket created", data);
}
