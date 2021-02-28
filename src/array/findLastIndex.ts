export const findLastIndex = <T>(
  arr: T[],
  predicate: (x: T) => boolean
): number => {
  const l = arr.length;
  let i = l - 1;
  while (!predicate(arr[i]) && i >= 0) {
    i -= 1;
  }
  return i;
};

export default findLastIndex;