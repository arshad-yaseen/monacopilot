import React from 'react';

type UseDebounceAsyncFnOptions = {
  wait: number;
};

const useDebounceAsyncFn = <T extends any[], R>(
  func: (...args: T) => Promise<R>,
  options: UseDebounceAsyncFnOptions,
): ((...args: T) => Promise<R>) => {
  const {wait} = options;
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const funcRef = React.useRef(func);
  const promiseRef = React.useRef<{
    resolve: (value: R | PromiseLike<R>) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  React.useEffect(() => {
    funcRef.current = func;
  }, [func]);

  const debouncedFunction = React.useCallback(
    (...args: T): Promise<R> => {
      return new Promise<R>((resolve, reject) => {
        promiseRef.current = {resolve, reject};
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          funcRef
            .current(...args)
            .then(resolve)
            .catch(reject);
        }, wait);
      });
    },
    [wait],
  );

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (promiseRef.current) {
        promiseRef.current.reject();
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounceAsyncFn;
