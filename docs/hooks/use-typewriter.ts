import {useEffect, useState} from 'react';

const useTypewriter = (
  text: string,
  speed = 20,
  options: {
    onComplete?: () => void;
  } = {},
) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  const {onComplete} = options;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index === text.length) {
        clearTimeout(timeoutId);
        onComplete?.();
        return;
      }

      setDisplayText(prevText => prevText + text.charAt(index));
      setIndex(prevIndex => prevIndex + 1);
    }, speed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, speed, index]);

  return displayText;
};

export default useTypewriter;
