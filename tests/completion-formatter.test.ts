import {describe, expect, it} from 'vitest';

import {CompletionFormatter} from '../src/classes/completion-formatter';
import {MOCK_COMPLETION_POS} from './mock';

describe('CompletionFormatter', () => {
  describe('create', () => {
    it('should create a new instance of CompletionFormatter', () => {
      const formatter = CompletionFormatter.create(
        'const greeting = "Hello, World!";',
        MOCK_COMPLETION_POS.column,
      );
      expect(formatter).toBeInstanceOf(CompletionFormatter);
    });
  });

  describe('removeInvalidLineBreaks', () => {
    it('should remove trailing line breaks', () => {
      const formatter = CompletionFormatter.create(
        'function sum(a, b) {\n  return a + b;\n}\n\n',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeInvalidLineBreaks().build();
      expect(result).toBe('function sum(a, b) {\n  return a + b;\n}');
    });

    it('should not remove line breaks in the middle of the text', () => {
      const formatter = CompletionFormatter.create(
        'const x = 5;\nconst y = 10;\nconst sum = x + y;',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeInvalidLineBreaks().build();
      expect(result).toBe('const x = 5;\nconst y = 10;\nconst sum = x + y;');
    });

    it('should handle empty string', () => {
      const formatter = CompletionFormatter.create(
        '',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeInvalidLineBreaks().build();
      expect(result).toBe('');
    });
  });

  describe('removeMarkdownCodeSyntax', () => {
    it('should remove markdown code block syntax', () => {
      const formatter = CompletionFormatter.create(
        '```\nconst array = [1, 2, 3];\narray.map(x => x * 2);\n```',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe('const array = [1, 2, 3];\narray.map(x => x * 2);');
    });

    it('should remove multiple markdown code blocks', () => {
      const formatter = CompletionFormatter.create(
        '```\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```\nSome text\n```\nconst result = greet("Alice");\nconsole.log(result);\n```',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe(
        'function greet(name) {\n  return `Hello, ${name}!`;\n}\nSome text\nconst result = greet("Alice");\nconsole.log(result);',
      );
    });

    it('should handle code blocks with language specifiers', () => {
      const formatter = CompletionFormatter.create(
        '```javascript\nclass Person {\n  constructor(name) {\n    this.name = name;\n  }\n}\n```',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe(
        'class Person {\n  constructor(name) {\n    this.name = name;\n  }\n}',
      );
    });

    it('should not modify text without code blocks', () => {
      const formatter = CompletionFormatter.create(
        'const PI = 3.14159;',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe('const PI = 3.14159;');
    });

    it('should handle empty string', () => {
      const formatter = CompletionFormatter.create(
        '',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe('');
    });

    it('should handle incomplete code blocks', () => {
      const formatter = CompletionFormatter.create(
        '```\nconst incomplete = true;',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeMarkdownCodeSyntax().build();
      expect(result).toBe('```\nconst incomplete = true;');
    });
  });

  describe('removeExcessiveNewlines', () => {
    it('should replace three or more consecutive newlines with two newlines', () => {
      const formatter = CompletionFormatter.create(
        'import React from "react";\n\n\n\nconst App = () => {\n  return <div>Hello React</div>;\n};',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe(
        'import React from "react";\n\nconst App = () => {\n  return <div>Hello React</div>;\n};',
      );
    });

    it('should not modify text with two or fewer consecutive newlines', () => {
      const formatter = CompletionFormatter.create(
        'const x = 10;\n\nconst y = 20;',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe('const x = 10;\n\nconst y = 20;');
    });

    it('should handle multiple occurrences of excessive newlines', () => {
      const formatter = CompletionFormatter.create(
        'function add(a, b) {\n  return a + b;\n}\n\n\nfunction subtract(a, b) {\n  return a - b;\n}\n\n\n\nconst result = add(5, 3);',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe(
        'function add(a, b) {\n  return a + b;\n}\n\nfunction subtract(a, b) {\n  return a - b;\n}\n\nconst result = add(5, 3);',
      );
    });

    it('should handle empty string', () => {
      const formatter = CompletionFormatter.create(
        '',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe('');
    });

    it('should handle string with only newlines', () => {
      const formatter = CompletionFormatter.create(
        '\n\n\n\n',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.removeExcessiveNewlines().build();
      expect(result).toBe('\n\n');
    });
  });

  describe('indentByColumn', () => {
    it('should indent subsequent lines by the current column position', () => {
      const formatter = CompletionFormatter.create(
        'const numbers = [\n1,\n2,\n3\n];',
        4,
      );
      const result = formatter.indentByColumn().build();
      expect(result).toBe('const numbers = [\n   1,\n   2,\n   3\n   ];');
    });

    it('should not modify single line text', () => {
      const formatter = CompletionFormatter.create('const x = 42;', 3);
      const result = formatter.indentByColumn().build();
      expect(result).toBe('const x = 42;');
    });

    it('should handle empty string', () => {
      const formatter = CompletionFormatter.create('', 5);
      const result = formatter.indentByColumn().build();
      expect(result).toBe('');
    });

    it('should handle text with existing indentation', () => {
      const formatter = CompletionFormatter.create(
        'function test() {\n  const x = 1;\n    return x;\n}',
        6,
      );
      const result = formatter.indentByColumn().build();
      expect(result).toBe(
        'function test() {\n       const x = 1;\n         return x;\n     }',
      );
    });
  });

  describe('build', () => {
    it('should return the formatted completion', () => {
      const formatter = CompletionFormatter.create(
        '  const square = (x) => x * x;  ',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter.build();
      expect(result).toBe('  const square = (x) => x * x;  ');
    });
  });

  describe('chaining methods', () => {
    it('should allow chaining of multiple formatting methods', () => {
      const formatter = CompletionFormatter.create(
        '```\nconst fruits = ["apple", "banana", "orange"];\nconst upperFruits = fruits.map(fruit => fruit.toUpperCase());\n```\n\n\n\nconsole.log(upperFruits);',
        MOCK_COMPLETION_POS.column,
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
      const formatter = CompletionFormatter.create(
        '',
        MOCK_COMPLETION_POS.column,
      );
      const result = formatter
        .removeMarkdownCodeSyntax()
        .removeExcessiveNewlines()
        .removeInvalidLineBreaks()
        .build();
      expect(result).toBe('');
    });
  });
});
