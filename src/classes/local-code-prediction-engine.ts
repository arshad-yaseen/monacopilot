import {err} from '../error';
import {predictions} from '../helpers/local-prediction';
import {LocalPredictionSnippets} from '../types';
import {reverseString} from '../utils';

export class LocalCodePredictionEngine {
  private readonly predictions: Map<string, LocalPredictionSnippets>;

  constructor() {
    this.predictions = new Map();
    this.loadPredictions();
  }

  /**
   * Predict the next code snippet based on the current common code snippet.
   * @param language The language of the code snippet.
   * @param currentLineCode The current code snippet.
   * @returns The predicted code snippet, or an empty string if no prediction is found.
   */
  public predictCode(language: string, currentLineCode: string): string {
    try {
      const languagePredictions = this.predictions.get(language);
      if (!languagePredictions) {
        return '';
      }

      const reversedCurrentLine = reverseString(currentLineCode);
      return this.findMatchingPrediction(
        languagePredictions,
        reversedCurrentLine,
      );
    } catch (error) {
      err(error).predictionError('Error while predicting code');
      return '';
    }
  }

  private loadPredictions(): void {
    predictions.forEach(prediction => {
      this.predictions.set(prediction.language, prediction.snippets);
    });
  }

  private findMatchingPrediction(
    predictions: LocalPredictionSnippets,
    reversedCurrentLine: string,
  ): string {
    for (const [key, value] of Object.entries(predictions)) {
      if (reversedCurrentLine.startsWith(reverseString(key))) {
        return value;
      }
    }
    return '';
  }
}
