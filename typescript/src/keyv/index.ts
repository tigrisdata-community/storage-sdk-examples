import Keyv from "keyv";
import { KeyvTigris } from "@tigrisdata/keyv-tigris";

const store = new KeyvTigris();

const keyv = new Keyv({ store });

await keyv.set("hello", "world");

const value = await keyv.get("hello");

console.log({ value });

const has = await keyv.has("hello");

console.log({ has });

const del = await keyv.delete("hello");

console.log({ del });

const clear = await keyv.clear();

console.log({ clear });
