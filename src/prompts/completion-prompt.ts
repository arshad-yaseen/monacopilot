import {constructPromptWithContext} from '.';
import {CompletionMetadata, PromptData} from '../types';

const CURSOR_TOKEN = '<cursor>';

const generateCompletionPrompt = (metadata: CompletionMetadata): PromptData => {
  const {
    textBeforeCursor = '',
    textAfterCursor = '',
    editorState: {completionMode},
    language,
  } = metadata;

  const codeFile = `<code_file>
${textBeforeCursor}${CURSOR_TOKEN}${textAfterCursor}
</code_file>`;

  const completionModeInstructions: Record<string, string> = {
    continue:
      '-- Analyze the code structure and continue writing from the cursor position, maintaining logical flow.',
    insert:
      '-- Insert a precise, contextually appropriate code snippet at the cursor position while preserving surrounding code integrity.',
    complete:
      '-- Complete the current statement or block with syntactically correct and logically coherent code.',
  };

  const instructions = `
<instructions>
  <context>
    Below is a ${language || 'code'} file with the token '${CURSOR_TOKEN}' marking the exact cursor position where code completion is needed.

    ${codeFile}
  </context>

  <critical_rules>
    1. NEVER REPEAT ANY TEXT THAT APPEARS BEFORE THE CURSOR
    2. Start your completion EXACTLY from the cursor position
    3. If user types 'const ' and cursor is after it, DO NOT include 'const ' in your completion
    4. ONLY provide the remaining part of the code that should appear after the cursor
    5. Violation of these rules will cause code duplication and syntax errors
  </critical_rules>

  <primary_objectives>
    1. Generate code that is syntactically correct and follows ${language || 'the language'}'s best practices
    2. Ensure seamless integration with existing code structure
    3. Maintain consistent naming conventions and coding style
    4. Provide only the exact code needed at the cursor position
  </primary_objectives>

  <strict_requirements>
    - Output MUST contain only the NEW code to be inserted at cursor position
    - NEVER repeat any code that appears before the cursor position
    - DO NOT include any code that appears before the cursor
    - DO NOT include explanatory comments or documentation
    - DO NOT wrap output in markdown code blocks
    - DO NOT include placeholder text or TODO comments
    - AVOID generating code beyond the immediate logical completion
  </strict_requirements>

  <completion_mode>
    Active Mode: ${completionMode}
    Specific Instructions: ${completionModeInstructions[completionMode] || ''}
  </completion_mode>

  <code_analysis_steps>
    1. Analyze the code context before and after the cursor
    2. Identify the current scope and available variables/functions
    3. Determine the logical flow and required completion
    4. Remove any duplicate text that appears before cursor
    5. Verify completion starts exactly at cursor position
  </code_analysis_steps>

  <examples>
    <example>
      Context: "const <cursor>"
      CORRECT COMPLETION: "myVariable = 42"
      INCORRECT COMPLETION: "const myVariable = 42"
    </example>

    <example>
      Context: "function hello<cursor>"
      CORRECT COMPLETION: "(name: string) {\\n  return 'Hello ' + name;\\n}"
      INCORRECT COMPLETION: "function hello(name: string) {\\n  return 'Hello ' + name;\\n}"
    </example>

    <example>
      Context: "const randomNumber = Math.floor(Math.ran<cursor>00);"
      CORRECT COMPLETION: "dom() * 1"
      INCORRECT COMPLETION: "Math.random() * 1"
    </example>

    <example>
      Context: "const result = 'Hello' + ' W<cursor>';"
      CORRECT COMPLETION: "orld"
      INCORRECT COMPLETION: "orld';"
    </example>

    <example>
      Context: "function isPalindrome(<cursor>)"
      CORRECT COMPLETION: "str) {\n  return str === str.split('').reverse().join('');\n}"
      INCORRECT COMPLETION: "(str) {\n  return str === str.split('').reverse().join('');\n}"
    </example>
  </examples>

  <error_prevention>
    - Verify that generated code doesn't introduce syntax errors
    - Ensure variable and function references are valid in the current scope
    - Check for proper bracket and parenthesis matching
    - Maintain consistent indentation with surrounding code
    - Respect language-specific type safety requirements
    - NEVER duplicate text that appears before cursor
  </error_prevention>

  <final_validation>
    Before providing the completion:
    1. Confirm the output contains ONLY the new code after cursor position
    2. Double-check no text before cursor is duplicated
    3. Verify it fits seamlessly at the cursor position
    4. Ensure it follows the active completion mode requirements
    5. Check for consistency with existing code style
  </final_validation>
</instructions>`.trim();

  return constructPromptWithContext(instructions, metadata);
};

export default generateCompletionPrompt;
