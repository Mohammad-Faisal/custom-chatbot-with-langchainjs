import { GoogleAuth } from "google-auth-library";
export class GoogleVertexAIConnection {
    constructor(fields, caller) {
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "us-central1-aiplatform.googleapis.com"
        });
        Object.defineProperty(this, "location", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "us-central1"
        });
        Object.defineProperty(this, "apiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "v1"
        });
        Object.defineProperty(this, "auth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.caller = caller;
        this.endpoint = fields?.endpoint ?? this.endpoint;
        this.location = fields?.location ?? this.location;
        this.apiVersion = fields?.apiVersion ?? this.apiVersion;
        this.auth = new GoogleAuth({
            scopes: "https://www.googleapis.com/auth/cloud-platform",
            ...fields?.authOptions,
        });
    }
    buildMethod() {
        return "POST";
    }
    async _request(data, options) {
        const client = await this.auth.getClient();
        const url = await this.buildUrl();
        const method = this.buildMethod();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const opts = {
            url,
            method,
        };
        if (data && method === "POST") {
            opts.data = data;
        }
        async function _request() {
            return client.request(opts);
        }
        try {
            const callResponse = await this.caller.callWithOptions({ signal: options?.signal }, _request.bind(client));
            const response = callResponse; // Done for typecast safety, I guess
            return response;
        }
        catch (x) {
            console.error(JSON.stringify(x, null, 1));
            throw x;
        }
    }
}
export class GoogleVertexAILLMConnection extends GoogleVertexAIConnection {
    constructor(fields, caller) {
        super(fields, caller);
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.model = fields?.model ?? this.model;
    }
    async buildUrl() {
        const projectId = await this.auth.getProjectId();
        const url = `https://${this.endpoint}/v1/projects/${projectId}/locations/${this.location}/publishers/google/models/${this.model}:predict`;
        return url;
    }
    async request(instances, parameters, options) {
        const data = {
            instances,
            parameters,
        };
        const response = await this._request(data, options);
        return response;
    }
}
