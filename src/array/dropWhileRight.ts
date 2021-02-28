export const dropWhileRight = <T>(
  arr: T[],
  predicate: (x: T) => boolean
): T[] => {
  const l = arr.length;
  let i = l - 1;
  while (predicate(arr[i]) && i >= 0) {
    i -= 1;
  }
  return arr.slice(0, i + 1);
};

export default dropWhileRight;