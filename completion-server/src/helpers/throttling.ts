const lastRequestTime = new Map<string, number>();

const throttle = (key: string | undefined, throttleTime: number) => {
  if (!key) {
    throw new Error('Throttling key is missing');
  }
  const now = Date.now();
  const lastTime = lastRequestTime.get(key) || 0;

  if (now - lastTime < throttleTime) {
    throw new Error('Too many requests in a short period of time');
  }

  lastRequestTime.set(key, now);
};

export default throttle;
