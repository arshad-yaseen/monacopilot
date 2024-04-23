import {
  FILTER_CHARACTER_MAP,
  FILTER_INTERCEPT,
  FILTER_LANGUAGE_MAP,
  FILTER_WEIGHTS,
} from '../constants/contextual-filter';
import {CodeContextualFilterContext} from '../types/completion';
import {getLastLineLength} from '../utils/completion/common';

class CodeContextualFilterManager {
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
const codeContextualFilterScore = (
  context: CodeContextualFilterContext,
): number => {
  const manager = context.get(CodeContextualFilterManager);
  const previousLabel = manager.previousLabel;
  let modifier = 0;

  if (context.properties.afterCursorWhitespace === 'true') {
    modifier = 1;
  }

  const timeDifference = (Date.now() - manager.previousLabelTimestamp) / 1000;
  const timeScore = Math.log(1 + timeDifference);

  let lastLineLengthScore = 0;
  let characterMapScore = 0;

  if (context.prefix) {
    lastLineLengthScore = Math.log(1 + getLastLineLength(context.prefix));
    const lastCharacter = context.prefix.slice(-1);

    if (lastCharacter in FILTER_CHARACTER_MAP) {
      characterMapScore = FILTER_CHARACTER_MAP[lastCharacter];
    }
  }

  let documentLengthScore = 0;
  if (context.measurements.documentLength) {
    documentLengthScore = Math.log(1 + context.measurements.documentLength);
  }

  let promptEndPosScore = 0;
  if (context.measurements.promptEndPos) {
    promptEndPosScore = Math.log(1 + context.measurements.promptEndPos);
  }

  let relativePositionScore = 0;
  if (
    context.measurements.promptEndPos &&
    context.measurements.documentLength
  ) {
    relativePositionScore =
      (context.measurements.promptEndPos + 0.5) /
      (1 + context.measurements.documentLength);
  }

  let languageScore = 0;
  if (
    context.properties.languageId &&
    context.properties.languageId in FILTER_LANGUAGE_MAP
  ) {
    languageScore = FILTER_LANGUAGE_MAP[context.properties.languageId];
  }

  let score = FILTER_INTERCEPT;
  score += FILTER_WEIGHTS[0] * previousLabel;
  score += FILTER_WEIGHTS[1] * modifier;
  score += FILTER_WEIGHTS[2] * timeScore;
  score += FILTER_WEIGHTS[3] * lastLineLengthScore;
  score += FILTER_WEIGHTS[4] * documentLengthScore;
  score += FILTER_WEIGHTS[5] * promptEndPosScore;
  score += FILTER_WEIGHTS[6] * relativePositionScore;
  score += FILTER_WEIGHTS[7 + languageScore];
  score += FILTER_WEIGHTS[29 + characterMapScore];

  const acceptanceProbability = 1 / (1 + Math.exp(-score));
  manager.probabilityAccept = acceptanceProbability;

  return acceptanceProbability;
};

export {
  CodeContextualFilterManager,
  getLastLineLength,
  codeContextualFilterScore,
};
