import {Copilot, type PromptData} from '@monacopilot/core';

import {buildPrompt} from './prompt';
import type {
    CompletionMetadata,
    CompletionRequest,
    CompletionResponse,
} from './types/core';

export class CompletionCopilot extends Copilot<CompletionMetadata> {
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
        return buildPrompt(metadata);
    }
}
