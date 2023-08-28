"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pull = exports.push = void 0;
const langchainhub_1 = require("langchainhub");
const index_js_1 = require("./load/index.cjs");
async function push(repoFullName, runnable, options) {
    const client = new langchainhub_1.Client(options);
    return client.push(repoFullName, JSON.stringify(runnable), options);
}
exports.push = push;
async function pull(ownerRepoCommit, options) {
    const client = new langchainhub_1.Client(options);
    const result = await client.pull(ownerRepoCommit);
    return (0, index_js_1.load)(result);
}
exports.pull = pull;
