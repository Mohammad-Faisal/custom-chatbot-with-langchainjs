import { BaseChatModel } from "./base.js";
import { BaseMessage, ChatGeneration, ChatMessage, ChatResult, LLMResult } from "../schema/index.js";
import { GoogleVertexAILLMConnection } from "../util/googlevertexai-connection.js";
import { GoogleVertexAIBaseLLMInput, GoogleVertexAIBasePrediction } from "../types/googlevertexai-types.js";
import { BaseLanguageModelCallOptions } from "../base_language/index.js";
/**
 * Represents a single "example" exchange that can be provided to
 * help illustrate what a model response should look like.
 */
export interface ChatExample {
    input: BaseMessage;
    output: BaseMessage;
}
/**
 * Represents a single example exchange in the Google Vertex AI chat
 * model.
 */
interface GoogleVertexAIChatExample {
    input: GoogleVertexAIChatMessage;
    output: GoogleVertexAIChatMessage;
}
/**
 * Represents the author of a chat message in the Google Vertex AI chat
 * model.
 */
export type GoogleVertexAIChatAuthor = "user" | "bot" | "system" | "context";
export type GoogleVertexAIChatMessageFields = {
    author?: GoogleVertexAIChatAuthor;
    content: string;
    name?: string;
};
/**
 * Represents a chat message in the Google Vertex AI chat model.
 */
export declare class GoogleVertexAIChatMessage {
    author?: GoogleVertexAIChatAuthor;
    content: string;
    name?: string;
    constructor(fields: GoogleVertexAIChatMessageFields);
    /**
     * Extracts the role of a generic message and maps it to a Google Vertex
     * AI chat author.
     * @param message The chat message to extract the role from.
     * @returns The role of the message mapped to a Google Vertex AI chat author.
     */
    static extractGenericMessageCustomRole(message: ChatMessage): GoogleVertexAIChatAuthor;
    /**
     * Maps a message type to a Google Vertex AI chat author.
     * @param message The message to map.
     * @param model The model to use for mapping.
     * @returns The message type mapped to a Google Vertex AI chat author.
     */
    static mapMessageTypeToVertexChatAuthor(message: BaseMessage, model: string): GoogleVertexAIChatAuthor;
    /**
     * Creates a new Google Vertex AI chat message from a base message.
     * @param message The base message to convert.
     * @param model The model to use for conversion.
     * @returns A new Google Vertex AI chat message.
     */
    static fromChatMessage(message: BaseMessage, model: string): GoogleVertexAIChatMessage;
}
/**
 * Represents an instance of the Google Vertex AI chat model.
 */
export interface GoogleVertexAIChatInstance {
    context?: string;
    examples?: GoogleVertexAIChatExample[];
    messages: GoogleVertexAIChatMessage[];
}
/**
 * Defines the prediction output of the Google Vertex AI chat model.
 */
export interface GoogleVertexAIChatPrediction extends GoogleVertexAIBasePrediction {
    candidates: GoogleVertexAIChatMessage[];
}
/**
 * Defines the input to the Google Vertex AI chat model.
 */
export interface GoogleVertexAIChatInput extends GoogleVertexAIBaseLLMInput {
    /** Instructions how the model should respond */
    context?: string;
    /** Help the model understand what an appropriate response is */
    examples?: ChatExample[];
}
/**
 * Enables calls to the Google Cloud's Vertex AI API to access
 * Large Language Models in a chat-like fashion.
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
export declare class ChatGoogleVertexAI extends BaseChatModel implements GoogleVertexAIChatInput {
    static lc_name(): string;
    lc_serializable: boolean;
    model: string;
    temperature: number;
    maxOutputTokens: number;
    topP: number;
    topK: number;
    examples: ChatExample[];
    connection: GoogleVertexAILLMConnection<BaseLanguageModelCallOptions, GoogleVertexAIChatInstance, GoogleVertexAIChatPrediction>;
    constructor(fields?: GoogleVertexAIChatInput);
    _combineLLMOutput(): LLMResult["llmOutput"];
    _generate(messages: BaseMessage[], options: this["ParsedCallOptions"]): Promise<ChatResult>;
    _llmType(): string;
    /**
     * Creates an instance of the Google Vertex AI chat model.
     * @param messages The messages for the model instance.
     * @returns A new instance of the Google Vertex AI chat model.
     */
    createInstance(messages: BaseMessage[]): GoogleVertexAIChatInstance;
    /**
     * Converts a prediction from the Google Vertex AI chat model to a chat
     * generation.
     * @param prediction The prediction to convert.
     * @returns The converted chat generation.
     */
    static convertPrediction(prediction: GoogleVertexAIChatPrediction): ChatGeneration;
}
export {};
