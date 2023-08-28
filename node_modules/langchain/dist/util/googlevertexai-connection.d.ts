import { GoogleAuth } from "google-auth-library";
import { BaseLanguageModelCallOptions } from "../base_language/index.js";
import { AsyncCaller, AsyncCallerCallOptions } from "./async_caller.js";
import { GoogleVertexAIBaseLLMInput, GoogleVertexAIBasePrediction, GoogleVertexAIConnectionParams, GoogleVertexAILLMResponse, GoogleVertexAIModelParams, GoogleVertexAIResponse } from "../types/googlevertexai-types.js";
export declare abstract class GoogleVertexAIConnection<CallOptions extends AsyncCallerCallOptions, ResponseType extends GoogleVertexAIResponse> implements GoogleVertexAIConnectionParams {
    caller: AsyncCaller;
    endpoint: string;
    location: string;
    apiVersion: string;
    auth: GoogleAuth;
    constructor(fields: GoogleVertexAIConnectionParams | undefined, caller: AsyncCaller);
    abstract buildUrl(): Promise<string>;
    buildMethod(): string;
    _request(data: unknown | undefined, options: CallOptions): Promise<ResponseType>;
}
export declare class GoogleVertexAILLMConnection<CallOptions extends BaseLanguageModelCallOptions, InstanceType, PredictionType extends GoogleVertexAIBasePrediction> extends GoogleVertexAIConnection<CallOptions, PredictionType> implements GoogleVertexAIBaseLLMInput {
    model: string;
    constructor(fields: GoogleVertexAIBaseLLMInput | undefined, caller: AsyncCaller);
    buildUrl(): Promise<string>;
    request(instances: InstanceType[], parameters: GoogleVertexAIModelParams, options: CallOptions): Promise<GoogleVertexAILLMResponse<PredictionType>>;
}
