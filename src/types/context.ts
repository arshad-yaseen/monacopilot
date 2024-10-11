export type CurrentFileName = string;
export type Technologies = string[];
export type RelatedFile = {
  /**
   * The relative path from the current editing code in the editor to an external file.
   *
   * Examples:
   * - To include a file `utils.js` in the same directory, set as `./utils.js`.
   * - To include a file `utils.js` in the parent directory, set as `../utils.js`.
   * - To include a file `utils.js` in the child directory, set as `./child/utils.js`.
   */
  path: string;

  /**
   * The content of the external file as a string.
   */
  content: string;
};

export type Context = {
  /**
   * The programming language of the current file being edited.
   */
  currentLanguage: string;
  /**
   * The resolved programming language of the current file being edited.
   * This is used to provide more specific language-based completions and suggestions,
   * especially when the initial language might be ambiguous (e.g., 'javascript' could be resolved to 'JavaScript (ES2024)').
   */
  resolvedCurrentLanguage: string;
  /**
   * The name of the file you are currently editing.
   */
  currentFileName?: CurrentFileName;
  /**
   * The related files with the adjusted maximum lines.
   */
  relatedFiles?: RelatedFile[];
  /**
   * The technologies (libraries, frameworks, etc.) you want to use for the completion.
   * This can provide technology-specific completions.
   * If you don't specify a technology, the completion will be specific to the language (provided as the `language`).
   *
   * @example
   * ['react', 'nextjs', 'tailwindcss', 'tanstack/react-query']
   * ['tensorflow', 'keras', 'numpy', 'pandas']
   * etc.
   */
  technologies?: Technologies;
  /**
   * The maximum number of lines of code to include in the context sent to the Language Model (LLM).
   * This helps to reduce the cost of the completion request.
   *
   * @default undefined - No limit is applied if not specified
   */
  maxContextLines?: number;
};

export type BuildContextOptions = Omit<Context, 'resolvedCurrentLanguage'>;
