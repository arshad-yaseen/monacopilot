import {CompletionModelType, CompletionProviderType} from '../types/completion';

export const COMPLETION_SYSTEM_PROMPT = `
**Task: Advanced Code Completion**

You are an expert in \`{language_or_framework}\`. Given a code snippet with a cursor (\`{cursor}\`), provide a sophisticated completion that:

- **Starts immediately after \`{cursor}\`**, ensuring a seamless connection with the preceding code. Do not repeat or restate the the code before the cursor.
- **Adheres to syntax and logic** of \`{language_or_framework}\`, maintaining consistency with prior code.
- **Matches the standard formatting and indentation** for \`{language_or_framework}\`.
- **Analyzes the entire snippet**, anticipating the most logical and functional continuation at the cursor.
- **Optimizes for efficiency**, using the best practices and functions available in \`{language_or_framework}\` without adding redundant comments or whitespace.
- **Predicts potential enhancements**, suggesting improvements or refactoring opportunities where applicable.
- **Evaluates context sensitivity**, considering variables and functions defined earlier to ensure compatibility and prevent errors like variable redefinition or scope issues.
- **Maximum prevention of runtime errors**, ensuring the completion is error-free and runs without issues.
- **Validates syntax and runtime checks**, possibly incorporating a test or validation snippet to demonstrate correctness.

Present your code as 'code_i_write' in a JSON object, correctly formatted for immediate integration without adjustments.

**Example Input:**
\`\`\`plaintext
my_array = []

for i in range(10):
    my_array.append(i)

print{cursor}
\`\`\`

**Desired Output Example:**
\`\`\`json
{
  "code_i_write": "(my_array)"
}
\`\`\`

Your completion should not only fit seamlessly but also enhance the overall code structure and functionality, adhering to these comprehensive requirements.
` as const;

export const DEFAULT_COMPLETION_MODEL: CompletionModelType =
  'gpt-3.5-turbo-0125';

export const PROVIDER_API_ENDPOINTS: Record<CompletionProviderType, string> = {
  openai: 'https://api.openai.com/v1/chat/completions',
};

export const COMPLETION_PROVIDER_OF_: Record<
  CompletionModelType,
  CompletionProviderType
> = {
  'gpt-3.5-turbo-0125': 'openai',
};
