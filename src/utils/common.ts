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
    const noUnwantedWhitespace = jsonString.replace(/\s+/g, ' ');
    return JSON.parse(noUnwantedWhitespace);
  } catch (error) {
    return null;
  }
};

export const objectToString = (obj: object, depth = 1): string => {
  if (obj === null || typeof obj !== 'object') {
    return String(obj);
  }

  const indent = '  '.repeat(depth);
  const entries = Object.entries(obj);
  const props = entries
    .map(([key, value]) => {
      const prefixedKey = `${indent}${key}: `;

      if (typeof value === 'function') {
        return `${prefixedKey}${value.toString()},\n`;
      } else if (typeof value === 'object' && value !== null) {
        return `${prefixedKey}${objectToString(value, depth + 1)},\n`;
      } else if (typeof value === 'string') {
        return `${prefixedKey}'${value.replace(/'/g, "\\'")}',\n`;
      } else {
        return `${prefixedKey}${value},\n`;
      }
    })
    .join('');

  return `{\n${props}${'  '.repeat(depth - 1)}}`;
};
