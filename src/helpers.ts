import * as monaco from 'monaco-editor';

export const getCompletionItem = async (
  position: monaco.Position,
  editor: monaco.editor.ITextModel,
) => {
  position;
  editor;

  await new Promise(resolve => setTimeout(resolve, 200));

  return Math.random().toString(36).substring(7);
};

export const getCompletionCacheKey = (
  position: monaco.Position,
  value: string,
) => `${position.lineNumber}:${position.column}:${value}`;
