export const before = (n: number, fn: Function) => {
  let count = 0;
  let result: any;
  return (...args: any[]): void | any => {
    if (count < n) {
      count += 1;
      result = fn(...args);
    }
    return result;
  };
};

export default before;
