/**
 * Merges a partial object with a fallback object, deeply combining the two.
 *
 * @param {Partial<T>} partial - the partial object to merge (can be undefined)
 * @param {T} fallback - the fallback object to merge with
 * @return {T} the merged object
 */
export function deepMerge<T>(partial: Partial<T> | undefined, fallback: T): T {
  const merged: any = {...fallback};

  for (const key in partial) {
    if (typeof partial[key] === 'object' && !Array.isArray(partial[key])) {
      if (
        fallback[key] &&
        typeof fallback[key] === 'object' &&
        !Array.isArray(fallback[key])
      ) {
        merged[key] = deepMerge(
          partial[key] as Partial<T> | undefined,
          fallback[key] as T,
        );
      } else {
        merged[key] = {...partial[key]};
      }
    } else {
      merged[key] = partial[key];
    }
  }

  return merged;
}

export const parseJson = (jsonString: string | null) => {
  if (!jsonString) {
    return null;
  }

  if (jsonString.startsWith('```json') && jsonString.endsWith('```')) {
    jsonString = jsonString.slice(7, -3);
  }

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
};

export const extractSuffixAfterLastPrefix = (
  fullString: string,
  prefix: string,
): string | null => {
  const lastIndex = fullString.lastIndexOf(prefix);

  if (lastIndex === -1) {
    return null;
  }

  return fullString.slice(lastIndex + prefix.length);
};
