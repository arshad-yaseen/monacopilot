import {describe, expect, it} from 'vitest';

import {parseProviderChatCompletion} from '../src/helpers/provider';
import {
  ChatCompletion,
  CompletionProvider,
  PickChatCompletion,
} from '../src/types';

describe('Provider Handler Functions', () => {
  describe('parseProviderChatCompletion', () => {
    it('should call the correct handler for OpenAI', () => {
      const mockCompletion = {
        choices: [{message: {content: 'OpenAI response'}}],
      } as unknown as ChatCompletion;
      const result = parseProviderChatCompletion(
        mockCompletion as ChatCompletion,
        'openai',
      );
      expect(result).toEqual({completion: 'OpenAI response'});
    });

    it('should call the correct handler for Groq', () => {
      const mockCompletion = {choices: [{message: {content: 'Groq response'}}]};
      const result = parseProviderChatCompletion(
        mockCompletion as ChatCompletion,
        'groq',
      );
      expect(result).toEqual({completion: 'Groq response'});
    });

    it('should call the correct handler for Anthropic', () => {
      const mockCompletion = {content: 'Anthropic response'};
      const result = parseProviderChatCompletion(
        mockCompletion as unknown as ChatCompletion,
        'anthropic',
      );
      expect(result).toEqual({completion: 'Anthropic response'});
    });

    it('should throw an error for an unsupported provider', () => {
      const mockCompletion = {} as unknown as ChatCompletion;
      expect(() =>
        parseProviderChatCompletion(
          mockCompletion as ChatCompletion,
          'unsupported' as CompletionProvider,
        ),
      ).toThrow('Unsupported provider: unsupported');
    });
  });

  describe('parseOpenAICompletion', () => {
    it('should parse a valid OpenAI completion', () => {
      const mockCompletion = {
        choices: [{message: {content: 'OpenAI response'}}],
      } as unknown as PickChatCompletion<'openai'>;
      const result = parseProviderChatCompletion(mockCompletion, 'openai');
      expect(result).toEqual({completion: 'OpenAI response'});
    });

    it('should handle empty choices array', () => {
      const mockCompletion = {
        choices: [],
      } as unknown as PickChatCompletion<'openai'>;
      const result = parseProviderChatCompletion(mockCompletion, 'openai');
      expect(result).toEqual({
        completion: null,
        error: 'No completion found in the OpenAI response',
      });
    });

    it('should handle undefined choices', () => {
      const mockCompletion = {} as unknown as PickChatCompletion<'openai'>;
      const result = parseProviderChatCompletion(mockCompletion, 'openai');
      expect(result).toEqual({
        completion: null,
        error: 'No completion found in the OpenAI response',
      });
    });
  });

  describe('parseGroqCompletion', () => {
    it('should parse a valid Groq completion', () => {
      const mockCompletion = {
        choices: [{message: {content: 'Groq response'}}],
      } as unknown as PickChatCompletion<'groq'>;
      const result = parseProviderChatCompletion(mockCompletion, 'groq');
      expect(result).toEqual({completion: 'Groq response'});
    });

    it('should handle empty choices array', () => {
      const mockCompletion = {
        choices: [],
      } as unknown as PickChatCompletion<'groq'>;
      const result = parseProviderChatCompletion(mockCompletion, 'groq');
      expect(result).toEqual({
        completion: null,
        error: 'No completion found in the Groq response',
      });
    });

    it('should handle undefined choices', () => {
      const mockCompletion = {} as unknown as PickChatCompletion<'groq'>;
      const result = parseProviderChatCompletion(mockCompletion, 'groq');
      expect(result).toEqual({
        completion: null,
        error: 'No completion found in the Groq response',
      });
    });
  });

  describe('parseAnthropicCompletion', () => {
    it('should parse a valid Anthropic completion', () => {
      const mockCompletion = {
        content: 'Anthropic response',
      } as unknown as PickChatCompletion<'anthropic'>;
      const result = parseProviderChatCompletion(mockCompletion, 'anthropic');
      expect(result).toEqual({completion: 'Anthropic response'});
    });

    it('should handle missing content', () => {
      const mockCompletion = {} as unknown as PickChatCompletion<'anthropic'>;
      const result = parseProviderChatCompletion(mockCompletion, 'anthropic');
      expect(result).toEqual({
        completion: null,
        error: 'No completion found in the Anthropic response',
      });
    });

    it('should handle non-string content', () => {
      const mockCompletion = {
        content: {invalid: 'object'},
      } as unknown as PickChatCompletion<'anthropic'>;
      const result = parseProviderChatCompletion(mockCompletion, 'anthropic');
      expect(result).toEqual({
        completion: null,
        error: 'Completion content is not a string',
      });
    });

    it('should handle empty string content', () => {
      const mockCompletion = {
        content: '',
      } as unknown as PickChatCompletion<'anthropic'>;
      const result = parseProviderChatCompletion(mockCompletion, 'anthropic');
      expect(result).toEqual({
        completion: null,
        error: 'No completion found in the Anthropic response',
      });
    });
  });
});
