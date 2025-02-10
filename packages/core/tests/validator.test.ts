import {describe, expect, it} from 'vitest';

import type {CopilotOptions, CustomCopilotModel} from '../src/types/copilot';
import validator from '../src/validator';

describe('Validator', () => {
    describe('params validation', () => {
        it('should throw error if apiKey is missing', () => {
            expect(() => validator.params('', {} as CopilotOptions)).toThrow(
                'Please provide an API key.',
            );
        });

        it('should throw error if options are missing', () => {
            expect(() => validator.params('key', {} as CopilotOptions)).toThrow(
                'Please provide options.',
            );
        });

        it('should not throw with valid params', () => {
            expect(() =>
                validator.params('key', {
                    provider: 'openai',
                    model: 'gpt-4o',
                }),
            ).not.toThrow();
        });
    });

    describe('inputs validation', () => {
        const customModel: CustomCopilotModel = {
            config: () => ({
                endpoint: 'test',
                body: {},
            }),
            transformResponse: () => ({text: null}),
        };

        it('should throw if provider specified with custom model', () => {
            expect(() => validator.inputs(customModel, 'openai')).toThrow(
                'Provider should not be specified when using a custom model.',
            );
        });

        it('should throw if custom model missing required properties', () => {
            expect(() => validator.inputs({} as CustomCopilotModel)).toThrow(
                'Please ensure both config and transformResponse are provided for custom model.',
            );
        });

        it('should throw if provider not specified for built-in model', () => {
            expect(() => validator.inputs('gpt-4o')).toThrow(
                'Provider must be specified and supported',
            );
        });

        it('should throw if model not supported by provider', () => {
            expect(() => validator.inputs('gpt-4o', 'anthropic')).toThrow(
                'Model "gpt-4o" is not supported by the "anthropic" provider',
            );
        });

        it('should not throw with valid built-in model and provider', () => {
            expect(() => validator.inputs('gpt-4o', 'openai')).not.toThrow();
        });

        it('should not throw with valid custom model', () => {
            expect(() => validator.inputs(customModel)).not.toThrow();
        });
    });
});
