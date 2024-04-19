/** This function is used to predict the code based on the language and the code that is being written.
 *  The working is when the user types a few characters, the function will predict the code that the user is trying to write.
 */
export const localPredictionModel = (language: string, code: string) => {
  const prediction = predictions[language];

  if (!prediction) return null;

  const codeSnippet = code.split('').reverse().join('');

  for (const key in prediction) {
    if (codeSnippet.startsWith(key.split('').reverse().join(''))) {
      return prediction[key];
    }
  }

  return null;
};

export const predictions = {
  javascript: {
    conso: 'le.log(',
    'new P': 'romise(',
    'new A': 'rray(',
    'new S': 'et(',
    'throw n': 'ew ',
    'throw new E': 'rror(',
    'setTimeout(': '() => {',
    'setInterval(': '() => {',
    'async f': 'unction ',
    'async (': ') => {',
    'async =>': ' {',
    ') =>': ' {',
  },
};
