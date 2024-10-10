import {describe, expect, it} from 'vitest';

import {LLMCodeFormatter} from '../src/classes/llm-code-formatter';

describe('LLMCodeFormatter', () => {
  describe('create', () => {
    it('should create a new instance of LLMCodeFormatter', () => {
      const formatter = LLMCodeFormatter.create(
        'const greeting = "Hello, World!";',
      );
      expect(formatter).toBeInstanceOf(LLMCodeFormatter);
    });
  });

  describe('removeInvalidLineBreaks', () => {
    it('should remove trailing line breaks', () => {
      const formatter = LLMCodeFormatter.create(
        'function sum(a, b) {\n  return a + b;\n}\n\n',
      );
      const result = formatter.removeInvalidLineBreaks().build();
      expect(result).toBe('function sum(a, b) {\n  return a + b;\n}');
    });

    it('should not remove line breaks in the middle of the text', () => {
      const formatter = LLMCodeFormatter.create(
        'const x = 5;\nconst y = 10;\nconst sum = x + y;',
      );
      const result = formatter.removeInvalidLineBreaks().build();
      expect(result).toBe('const x = 5;\nconst y = 10;\nconst sum = x + y;');
    });

    it('should handle empty string', () => {
      const formatter = LLMCodeFormatter.create('');
      const result = formatter.removeInvalidLineBreaks().build();
      expect(result).toBe('');
    });
  });

  describe('removeMarkdownCodeSyntax', () => {
    it('should remove markdown code block syntax', () => {
      const formatter = LLMCodeFormatter.create(
        '```\nconst array = [1, 2, 3];\narray.map(x => x * 2);\n```',
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe('const array = [1, 2, 3];\narray.map(x => x * 2);');
    });

    it('should remove multiple markdown code blocks', () => {
      const formatter = LLMCodeFormatter.create(
        '```\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```\nSome text\n```\nconst result = greet("Alice");\nconsole.log(result);\n```',
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe(
        'function greet(name) {\n  return `Hello, ${name}!`;\n}\nSome text\nconst result = greet("Alice");\nconsole.log(result);',
      );
    });

    it('should handle code blocks with language specifiers', () => {
      const formatter = LLMCodeFormatter.create(
        '```javascript\nclass Person {\n  constructor(name) {\n    this.name = name;\n  }\n}\n```',
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe(
        'class Person {\n  constructor(name) {\n    this.name = name;\n  }\n}',
      );
    });

    it('should not modify text without code blocks', () => {
      const formatter = LLMCodeFormatter.create('const PI = 3.14159;');
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe('const PI = 3.14159;');
    });

    it('should handle empty string', () => {
      const formatter = LLMCodeFormatter.create('');
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe('');
    });

    it('should handle incomplete code blocks', () => {
      const formatter = LLMCodeFormatter.create(
        '```\nconst incomplete = true;',
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe('```\nconst incomplete = true;');
    });
  });

  describe('removeExcessiveNewlines', () => {
    it('should replace three or more consecutive newlines with two newlines', () => {
      const formatter = LLMCodeFormatter.create(
        'import React from "react";\n\n\n\nconst App = () => {\n  return <div>Hello React</div>;\n};',
      );
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe(
        'import React from "react";\n\nconst App = () => {\n  return <div>Hello React</div>;\n};',
      );
    });

    it('should not modify text with two or fewer consecutive newlines', () => {
      const formatter = LLMCodeFormatter.create(
        'const x = 10;\n\nconst y = 20;',
      );
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe('const x = 10;\n\nconst y = 20;');
    });

    it('should handle multiple occurrences of excessive newlines', () => {
      const formatter = LLMCodeFormatter.create(
        'function add(a, b) {\n  return a + b;\n}\n\n\nfunction subtract(a, b) {\n  return a - b;\n}\n\n\n\nconst result = add(5, 3);',
      );
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe(
        'function add(a, b) {\n  return a + b;\n}\n\nfunction subtract(a, b) {\n  return a - b;\n}\n\nconst result = add(5, 3);',
      );
    });

    it('should handle empty string', () => {
      const formatter = LLMCodeFormatter.create('');
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe('');
    });

    it('should handle string with only newlines', () => {
      const formatter = LLMCodeFormatter.create('\n\n\n\n');
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe('\n\n');
    });
  });

  describe('build', () => {
    it('should return the formatted completion', () => {
      const formatter = LLMCodeFormatter.create(
        '  const square = (x) => x * x;  ',
      );
      const result = formatter.build();
      expect(result).toBe('  const square = (x) => x * x;  ');
    });
  });

  describe('chaining methods', () => {
    it('should allow chaining of multiple formatting methods', () => {
      const formatter = LLMCodeFormatter.create(
        '```\nconst fruits = ["apple", "banana", "orange"];\nconst upperFruits = fruits.map(fruit => fruit.toUpperCase());\n```\n\n\n\nconsole.log(upperFruits);',
      );
      const result = formatter
        .removeMarkdownCodeSyntax()
        .removeExcessiveNewlines()
        .removeInvalidLineBreaks()
        .build();
      expect(result).toBe(
        'const fruits = ["apple", "banana", "orange"];\nconst upperFruits = fruits.map(fruit => fruit.toUpperCase());\n\nconsole.log(upperFruits);',
      );
    });

    it('should handle empty string with all formatting methods', () => {
      const formatter = LLMCodeFormatter.create('');
      const result = formatter
        .removeMarkdownCodeSyntax()
        .removeExcessiveNewlines()
        .removeInvalidLineBreaks()
        .build();
      expect(result).toBe('');
    });
  });
});
