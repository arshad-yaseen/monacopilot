import {LLMCodeFormatter} from '../../classes/llm-code-formatter';

export const formatModifiedText = (text: string): string => {
  return LLMCodeFormatter.create(text)
    .removeMarkdownCodeSyntax()
    .removeInvalidLineBreaks()
    .removeExcessiveNewlines()
    .build();
};
