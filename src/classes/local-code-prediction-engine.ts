export class LocalCodePredictionEngine {
  private predictions: Map<string, {[prefix: string]: string}>;

  constructor() {
    this.predictions = new Map();
    this.loadPredictions();
  }

  private loadPredictions() {
    this.predictions.set('javascript', {
      conso: 'le.log($1)',
      'new P': 'romise((resolve, reject) => {\n\t$1\n})',
      'new A': 'rray',
      'new S': 'et',
      'throw n': 'ew Error($1)',
      setTimeout: '(() => {\n\t$1\n}, $2)',
      setInterval: '(() => {\n\t$1\n}, $2)',
      'async f': 'unction $1() {\n\t$2\n}$0',
      'async (': ') => {\n\t$1\n}$0',
      'async =>': ' {\n\t$1\n}$0',
      ') =>': ' {',
      'function fibonacci':
        '(n) {\n  if (n <= 1) {\n    return n;\n  }\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
      'const fibonacci ':
        '= (n) => {\n  if (n <= 1) {\n    return n;\n  }\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}',
    });
  }

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
