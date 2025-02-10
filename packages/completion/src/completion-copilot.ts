import {Copilot, Model, Provider, type PromptData} from '@monacopilot/core';

import {craftCompletionPrompt} from './prompt';
import type {
    CompletionMetadata,
    CompletionRequest,
    CompletionResponse,
} from './types';

export class CompletionCopilot extends Copilot<
    Provider,
    Model,
    CompletionMetadata
> {
    public async complete(
        request: CompletionRequest,
    ): Promise<CompletionResponse> {
        const {body, options} = request;
        const {customPrompt, headers} = options ?? {};
        const {completionMetadata} = body;

        const {text, raw, error} = await this.makeAIRequest(
            completionMetadata,
            {
                customPrompt,
                customHeaders: headers,
            },
        );

        return {completion: text, raw, error};
    }

    protected getDefaultPrompt(metadata: CompletionMetadata): PromptData {
        return craftCompletionPrompt(metadata);
    }
}
