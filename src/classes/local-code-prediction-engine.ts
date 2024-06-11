import predictions from '../helpers/local-prediction';
import type {LocalPredictionSnippets} from '../types/completion';
import {reverse} from '../utils/common';

export class LocalCodePredictionEngine {
  private predictions: Map<string, LocalPredictionSnippets>;

  constructor() {
    this.predictions = new Map();
    this.loadPredictions();
  }

  private loadPredictions() {
    predictions.forEach(prediction => {
      this.predictions.set(prediction.language, prediction.snippets);
    });
  }

  /**
   * Predict the next code snippet based on the current common code snippet.
   * @param language The language of the code snippet.
   * @param codeSnippet The current code snippet.
   * @returns The predicted code snippet, if no prediction is found, return an empty string.
   */
  predictCode(language: string, currentLineCode: string): string {
    const prediction = this.predictions.get(language);
    if (!prediction) return '';

    currentLineCode = reverse(currentLineCode);
    for (const key in prediction) {
      if (currentLineCode.startsWith(reverse(key))) {
        return prediction[key];
      }
    }

    return '';
  }
}
