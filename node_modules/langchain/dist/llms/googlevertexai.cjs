"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleVertexAI = void 0;
const base_js_1 = require("./base.cjs");
const googlevertexai_connection_js_1 = require("../util/googlevertexai-connection.cjs");
/**
 * Enables calls to the Google Cloud's Vertex AI API to access
 * Large Language Models.
 *
 * To use, you will need to have one of the following authentication
 * methods in place:
 * - You are logged into an account permitted to the Google Cloud project
 *   using Vertex AI.
 * - You are running this on a machine using a service account permitted to
 *   the Google Cloud project using Vertex AI.
 * - The `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set to the
 *   path of a credentials file for a service account permitted to the
 *   Google Cloud project using Vertex AI.
 */
class GoogleVertexAI extends base_js_1.BaseLLM {
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text-bison"
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.7
        });
        Object.defineProperty(this, "maxOutputTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1024
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.8
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 40
        });
        Object.defineProperty(this, "connection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.model = fields?.model ?? this.model;
        // Change the defaults for code models
        if (this.model.startsWith("code-gecko")) {
            this.maxOutputTokens = 64;
        }
        if (this.model.startsWith("code-")) {
            this.temperature = 0.2;
        }
        this.temperature = fields?.temperature ?? this.temperature;
        this.maxOutputTokens = fields?.maxOutputTokens ?? this.maxOutputTokens;
        this.topP = fields?.topP ?? this.topP;
        this.topK = fields?.topK ?? this.topK;
        this.connection = new googlevertexai_connection_js_1.GoogleVertexAILLMConnection({ ...fields, ...this }, this.caller);
    }
    _llmType() {
        return "googlevertexai";
    }
    async _generate(prompts, options) {
        const generations = await Promise.all(prompts.map((prompt) => this._generatePrompt(prompt, options)));
        return { generations };
    }
    async _generatePrompt(prompt, options) {
        const instance = this.formatInstance(prompt);
        const parameters = {
            temperature: this.temperature,
            topK: this.topK,
            topP: this.topP,
            maxOutputTokens: this.maxOutputTokens,
        };
        const result = await this.connection.request([instance], parameters, options);
        const prediction = this.extractPredictionFromResponse(result);
        return [
            {
                text: prediction.content,
                generationInfo: prediction,
            },
        ];
    }
    /**
     * Formats the input instance as a text instance for the Google Vertex AI
     * model.
     * @param prompt Prompt to be formatted as a text instance.
     * @returns A GoogleVertexAILLMInstance object representing the formatted text instance.
     */
    formatInstanceText(prompt) {
        return { content: prompt };
    }
    /**
     * Formats the input instance as a code instance for the Google Vertex AI
     * model.
     * @param prompt Prompt to be formatted as a code instance.
     * @returns A GoogleVertexAILLMInstance object representing the formatted code instance.
     */
    formatInstanceCode(prompt) {
        return { prefix: prompt };
    }
    /**
     * Formats the input instance for the Google Vertex AI model based on the
     * model type (text or code).
     * @param prompt Prompt to be formatted as an instance.
     * @returns A GoogleVertexAILLMInstance object representing the formatted instance.
     */
    formatInstance(prompt) {
        return this.model.startsWith("code-")
            ? this.formatInstanceCode(prompt)
            : this.formatInstanceText(prompt);
    }
    /**
     * Extracts the prediction from the API response.
     * @param result The API response from which to extract the prediction.
     * @returns A TextPrediction object representing the extracted prediction.
     */
    extractPredictionFromResponse(result) {
        return result?.data?.predictions[0];
    }
}
exports.GoogleVertexAI = GoogleVertexAI;
