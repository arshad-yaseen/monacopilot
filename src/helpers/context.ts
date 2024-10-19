import {BuildContextOptions, Context, RelatedFile} from '../types';
import {keepNLines} from '../utils';

/**
 * Builds a context object containing contextual information for generating relevant completions/suggestions.
 * @param options - The options for building the context.
 * @returns The context object.
 */
export const buildContext = (options: BuildContextOptions): Context => {
  const {maxContextLines, relatedFiles, ...restOptions} = options;

  // Determine the divisor based on the presence of related files
  const hasRelatedFiles = !!relatedFiles?.length;
  const divisor = hasRelatedFiles ? 3 : 2;
  const adjustedMaxContextLines = maxContextLines
    ? Math.floor(maxContextLines / divisor)
    : undefined;

  const processRelatedFiles = (
    files?: RelatedFile[],
    maxLines?: number,
  ): RelatedFile[] | undefined => {
    if (!files || !maxLines) return files;

    return files.map(({content, ...rest}) => ({
      ...rest,
      content: keepNLines(content, maxLines),
    }));
  };

  // Process related files with the adjusted maximum lines
  const limitedRelatedFiles = processRelatedFiles(
    relatedFiles,
    adjustedMaxContextLines,
  );

  return {
    relatedFiles: limitedRelatedFiles,
    maxContextLines: adjustedMaxContextLines,
    resolvedCurrentLanguage: resolveCurrentLanguage(
      restOptions.currentLanguage,
    ),
    ...restOptions,
  };
};

/**
 * Resolves the current language to a more specific language.
 * @param currentLanguage - The current language of the editor.
 * @returns The resolved language.
 */
const resolveCurrentLanguage = (currentLanguage: string) =>
  currentLanguage === 'javascript'
    ? 'Latest JavaScript (ES2024)'
    : currentLanguage;
