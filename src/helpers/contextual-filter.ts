import {
  FILTER_CHARACTER_MAP,
  FILTER_INTERCEPT,
  FILTER_LANGUAGE_MAP,
  FILTER_WEIGHTS,
} from '../constants';
import {ContextualFilterContext} from '../types';
import {getLastLineLength} from '../utils';

class ContextualFilterManager {
  previousLabel: number;
  previousLabelTimestamp: number;
  probabilityAccept: number;

  constructor() {
    this.previousLabel = 0;
    this.previousLabelTimestamp = Date.now() - 3600 * 1000; // 1 hour ago
    this.probabilityAccept = 0;
  }
}

/**
 * Compute the contextual filter score based on the given code context.
 * @param context The contextual filter context.
 * @returns The contextual filter score.
 */
export const getContextualFilterScore = (
  context: ContextualFilterContext,
): number => {
  const manager = new ContextualFilterManager();
  const prevLabel = manager.previousLabel;
  let correction = 0;
  if (context.properties.afterCursorWhitespace === 'true') {
    correction = 1;
  }
  const timeSinceLastLabel =
    (Date.now() - manager.previousLabelTimestamp) / 1000;
  const timeFactor = Math.log(1 + timeSinceLastLabel);

  let lastLineLog = 0,
    lastCharWeight = 0,
    trimLineLog = 0,
    trimCharWeight = 0;

  if (context.prefix) {
    lastLineLog = Math.log(1 + getLastLineLength(context.prefix));
    const lastChar = context.prefix.slice(-1);
    lastCharWeight = FILTER_CHARACTER_MAP[lastChar] ?? 0;
  }

  const trimmedPrefix = context.prefix?.trimEnd();
  if (trimmedPrefix) {
    trimLineLog = Math.log(1 + getLastLineLength(trimmedPrefix));
    const trimChar = trimmedPrefix.slice(-1);
    trimCharWeight = FILTER_CHARACTER_MAP[trimChar] ?? 0;
  }

  const docLengthLog = context.measurements.documentLength
    ? Math.log(1 + context.measurements.documentLength)
    : 0;
  const promptPosLog = context.measurements.promptEndPos
    ? Math.log(1 + context.measurements.promptEndPos)
    : 0;
  const relativePromptPos =
    context.measurements.promptEndPos && context.measurements.documentLength
      ? (context.measurements.promptEndPos + 0.5) /
        (1 + context.measurements.documentLength)
      : 0;
  const languageWeight = context.properties.languageId
    ? FILTER_LANGUAGE_MAP[context.properties.languageId]
    : 0;

  let score = FILTER_INTERCEPT;
  score +=
    FILTER_WEIGHTS[0] * prevLabel +
    FILTER_WEIGHTS[1] * correction +
    FILTER_WEIGHTS[2] * timeFactor;
  score += FILTER_WEIGHTS[3] * lastLineLog + FILTER_WEIGHTS[4] * trimLineLog;
  score += FILTER_WEIGHTS[5] * docLengthLog + FILTER_WEIGHTS[6] * promptPosLog;
  score += FILTER_WEIGHTS[7] * relativePromptPos;
  score += FILTER_WEIGHTS[8 + languageWeight];
  score += FILTER_WEIGHTS[29 + lastCharWeight];
  score += FILTER_WEIGHTS[125 + trimCharWeight];

  const probability = 1 / (1 + Math.exp(-score));
  manager.probabilityAccept = probability;
  return probability;
};
