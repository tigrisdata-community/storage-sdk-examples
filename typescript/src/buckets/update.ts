import { updateBucket } from "@tigrisdata/storage";

const { data, error } = await updateBucket("llm-base", {
    enableAdditionalHeaders: true,
    allowObjectAcl: true,
    disableDirectoryListing: true,
    customDomain: "https://llm-base.tigrisdata.com",
    enableDeleteProtection: true,
    locations: {
        type: "dual",
        values: ["ams", "fra"],
    },
});

if (error) {
    console.error("error updating bucket", error);
} else {
    console.log("bucket updated", data);
}