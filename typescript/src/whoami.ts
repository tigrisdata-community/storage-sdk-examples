import { whoami } from "@tigrisdata/iam";

const { data, error } = await whoami();

if (error) {
    console.error("error getting whoami", error);
} else {
    console.log("whoami", data);
}