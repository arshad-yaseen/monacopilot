function debounce<T extends (...args: any[]) => Promise<any>>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeout: NodeJS.Timeout | null = null;
  let pendingPromise: Promise<ReturnType<T>> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (pendingPromise) {
      return pendingPromise;
    }

    pendingPromise = new Promise<ReturnType<T>>((resolve, reject) => {
      const later = () => {
        timeout = null;
        func(...args)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            pendingPromise = null;
          });
      };

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait);
    });

    return pendingPromise;
  };
}

export default debounce;
