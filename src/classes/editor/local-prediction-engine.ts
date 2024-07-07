import {err} from '../../error';
import {predictions} from '../../helpers/local-prediction';
import {LocalPredictionSnippets} from '../../types';
import {reverseString} from '../../utils';

export class LocalPredictionEngine {
  private readonly predictions: Map<string, LocalPredictionSnippets>;

  constructor() {
    this.predictions = new Map();
    this.loadPredictions();
  }

  /**
   * Predict the next text snippet based on the current common text snippet.
   * @param language The language.
   * @param currentLineText The current text snippet.
   * @returns The predicted text snippet, or an empty string if no prediction is found.
   */
  public predict(language: string, currentLineText: string): string {
    try {
      const languagePredictions = this.predictions.get(language);
      if (!languagePredictions) {
        return '';
      }

      const reversedCurrentLine = reverseString(currentLineText);
      return this.findMatchingPrediction(
        languagePredictions,
        reversedCurrentLine,
      );
    } catch (error) {
      err(error).predictionError('Error while predicting next text snippet');
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
