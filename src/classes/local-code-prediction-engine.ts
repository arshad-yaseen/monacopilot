import {LocalPredictionSnippets} from '../types/completion';
import predictions from '../utils/completion/local-prediction';

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
  predictCode(language: string, codeSnippet: string): string {
    const prediction = this.predictions.get(language);
    if (!prediction) return '';

    codeSnippet = codeSnippet.split('').reverse().join('');
    for (const key in prediction) {
      if (codeSnippet.startsWith(key.split('').reverse().join(''))) {
        return prediction[key];
      }
    }

    return '';
  }
}
