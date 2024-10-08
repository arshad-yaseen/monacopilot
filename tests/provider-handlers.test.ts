import {describe, expect, it} from 'vitest';

import {parseProviderChatCompletion} from '../src/helpers/provider';
import {ChatCompletion, PickChatCompletion} from '../src/types';

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
      expect(result).toEqual('OpenAI response');
    });

    it('should call the correct handler for Groq', () => {
      const mockCompletion = {choices: [{message: {content: 'Groq response'}}]};
      const result = parseProviderChatCompletion(
        mockCompletion as ChatCompletion,
        'groq',
      );
      expect(result).toEqual('Groq response');
    });

    it('should call the correct handler for Anthropic', () => {
      const mockCompletion = {content: 'Anthropic response'};
      const result = parseProviderChatCompletion(
        mockCompletion as unknown as ChatCompletion,
        'anthropic',
      );
      expect(result).toEqual('Anthropic response');
    });
  });

  describe('parseOpenAICompletion', () => {
    it('should parse a valid OpenAI completion', () => {
      const mockCompletion = {
        choices: [{message: {content: 'OpenAI response'}}],
      } as unknown as PickChatCompletion<'openai'>;
      const result = parseProviderChatCompletion(mockCompletion, 'openai');
      expect(result).toEqual('OpenAI response');
    });

    it('should handle empty choices array', () => {
      const mockCompletion = {
        choices: [],
      } as unknown as PickChatCompletion<'openai'>;
      const result = parseProviderChatCompletion(mockCompletion, 'openai');
      expect(result).toEqual(null);
    });

    it('should handle undefined choices', () => {
      const mockCompletion = {} as unknown as PickChatCompletion<'openai'>;
      const result = parseProviderChatCompletion(mockCompletion, 'openai');
      expect(result).toEqual(null);
    });
  });

  describe('parseGroqCompletion', () => {
    it('should parse a valid Groq completion', () => {
      const mockCompletion = {
        choices: [{message: {content: 'Groq response'}}],
      } as unknown as PickChatCompletion<'groq'>;
      const result = parseProviderChatCompletion(mockCompletion, 'groq');
      expect(result).toEqual('Groq response');
    });

    it('should handle empty choices array', () => {
      const mockCompletion = {
        choices: [],
      } as unknown as PickChatCompletion<'groq'>;
      const result = parseProviderChatCompletion(mockCompletion, 'groq');
      expect(result).toEqual(null);
    });

    it('should handle undefined choices', () => {
      const mockCompletion = {} as unknown as PickChatCompletion<'groq'>;
      const result = parseProviderChatCompletion(mockCompletion, 'groq');
      expect(result).toEqual(null);
    });
  });

  describe('parseAnthropicCompletion', () => {
    it('should parse a valid Anthropic completion', () => {
      const mockCompletion = {
        content: 'Anthropic response',
      } as unknown as PickChatCompletion<'anthropic'>;
      const result = parseProviderChatCompletion(mockCompletion, 'anthropic');
      expect(result).toEqual('Anthropic response');
    });

    it('should handle missing content', () => {
      const mockCompletion = {} as unknown as PickChatCompletion<'anthropic'>;
      const result = parseProviderChatCompletion(mockCompletion, 'anthropic');
      expect(result).toEqual(null);
    });

    it('should handle non-string content', () => {
      const mockCompletion = {
        content: {invalid: 'object'},
      } as unknown as PickChatCompletion<'anthropic'>;
      const result = parseProviderChatCompletion(mockCompletion, 'anthropic');
      expect(result).toEqual(null);
    });

    it('should handle empty string content', () => {
      const mockCompletion = {
        content: '',
      } as unknown as PickChatCompletion<'anthropic'>;
      const result = parseProviderChatCompletion(mockCompletion, 'anthropic');
      expect(result).toEqual(null);
    });
  });
});
