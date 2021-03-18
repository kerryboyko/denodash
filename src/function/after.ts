export const after = (
  n: number,
  fn: Function,
): ((...args: any) => any | void) => {
  let count = 1;
  return (...args: any[]): void | any => {
    if (count >= n) {
      return fn(...args);
    }
    count += 1;
  };
};

export default after;
