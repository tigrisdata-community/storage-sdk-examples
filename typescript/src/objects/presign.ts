import { getPresignedUrl } from "@tigrisdata/storage";

const { data, error } = await getPresignedUrl("none.txt", {
    expiresIn: 3600,
    operation: "get",
});

if (error) {
    console.error("error getting presigned url", error);
} else {
    console.log("presigned url", data);
}