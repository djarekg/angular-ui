/**
 * Signal debounce using wait.
 */
export const wait = (ms: number, signal: AbortSignal) => {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => resolve(), ms);

    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timeout);
        reject(new Error('Operation aborted'));
      },
      { once: true },
    );
  });
};
