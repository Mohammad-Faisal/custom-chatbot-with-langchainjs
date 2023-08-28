import { BaseLLM } from "./base.js";
import { Generation, LLMResult } from "../schema/index.js";
import { GoogleVertexAIBaseLLMInput, GoogleVertexAIBasePrediction, GoogleVertexAILLMResponse } from "../types/googlevertexai-types.js";
/**
 * Interface representing the input to the Google Vertex AI model.
 */
export interface GoogleVertexAITextInput extends GoogleVertexAIBaseLLMInput {
}
/**
 * Interface representing the instance of text input to the Google Vertex
 * AI model.
 */
interface GoogleVertexAILLMTextInstance {
    content: string;
}
/**
 * Interface representing the instance of code input to the Google Vertex
 * AI model.
 */
interface GoogleVertexAILLMCodeInstance {
    prefix: string;
}
/**
 * Type representing an instance of either text or code input to the
 * Google Vertex AI model.
 */
type GoogleVertexAILLMInstance = GoogleVertexAILLMTextInstance | GoogleVertexAILLMCodeInstance;
/**
 * Models the data returned from the API call
 */
interface TextPrediction extends GoogleVertexAIBasePrediction {
    content: string;
}
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
export declare class GoogleVertexAI extends BaseLLM implements GoogleVertexAITextInput {
    model: string;
    temperature: number;
    maxOutputTokens: number;
    topP: number;
    topK: number;
    private connection;
    constructor(fields?: GoogleVertexAITextInput);
    _llmType(): string;
    _generate(prompts: string[], options: this["ParsedCallOptions"]): Promise<LLMResult>;
    _generatePrompt(prompt: string, options: this["ParsedCallOptions"]): Promise<Generation[]>;
    /**
     * Formats the input instance as a text instance for the Google Vertex AI
     * model.
     * @param prompt Prompt to be formatted as a text instance.
     * @returns A GoogleVertexAILLMInstance object representing the formatted text instance.
     */
    formatInstanceText(prompt: string): GoogleVertexAILLMInstance;
    /**
     * Formats the input instance as a code instance for the Google Vertex AI
     * model.
     * @param prompt Prompt to be formatted as a code instance.
     * @returns A GoogleVertexAILLMInstance object representing the formatted code instance.
     */
    formatInstanceCode(prompt: string): GoogleVertexAILLMInstance;
    /**
     * Formats the input instance for the Google Vertex AI model based on the
     * model type (text or code).
     * @param prompt Prompt to be formatted as an instance.
     * @returns A GoogleVertexAILLMInstance object representing the formatted instance.
     */
    formatInstance(prompt: string): GoogleVertexAILLMInstance;
    /**
     * Extracts the prediction from the API response.
     * @param result The API response from which to extract the prediction.
     * @returns A TextPrediction object representing the extracted prediction.
     */
    extractPredictionFromResponse(result: GoogleVertexAILLMResponse<TextPrediction>): TextPrediction;
}
export {};
