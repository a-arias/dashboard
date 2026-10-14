type RetryContext = {
  currentTest?: unknown;
  test?: unknown;
};

export const getRetryIndex = (ctx?: RetryContext): number => {
  const test = (ctx?.currentTest || ctx?.test) as { currentRetry?: () => number } | undefined;

  return typeof test?.currentRetry === 'function' ? test.currentRetry() : 0;
};

export const retrySafeResourceName = (name: string, ctx?: RetryContext): string => {
  const retryIndex = getRetryIndex(ctx);

  return `${ name }-r${ retryIndex }`;
};
