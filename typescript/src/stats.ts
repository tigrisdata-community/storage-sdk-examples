import { getStats } from "@tigrisdata/storage";

const stats = await getStats();

console.log({ stats });