type HashingFunction = (...args: any[]) => string;

const normalHashingFunction: HashingFunction = (args: any[]): string =>
  JSON.stringify(args);

export const memoize = (
  fn: Function,
  hashingFn: HashingFunction = normalHashingFunction,
) => {
  const cache: Record<string, any> = {};
  return (...args: any[]) => {
    if (cache[hashingFn(...args)] === undefined) {
      cache[hashingFn(...args)] = fn(...args);
    }
    return cache[hashingFn(...args)];
  };
};

export default memoize;
