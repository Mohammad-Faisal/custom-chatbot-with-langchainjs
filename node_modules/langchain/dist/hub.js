import { Client } from "langchainhub";
import { load } from "./load/index.js";
export async function push(repoFullName, runnable, options) {
    const client = new Client(options);
    return client.push(repoFullName, JSON.stringify(runnable), options);
}
export async function pull(ownerRepoCommit, options) {
    const client = new Client(options);
    const result = await client.pull(ownerRepoCommit);
    return load(result);
}
