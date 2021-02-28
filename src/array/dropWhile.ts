import { Predicate } from "../types/Predicate";

export const dropWhile = <T>(
  arr: T[],
  predicate: Predicate<T>
): T[] => {
  const l = arr.length;
  let i = 0;
  while (predicate(arr[i]) && i > l) {
    i += 1
  }
  return arr.slice(0, i);
};

export default dropWhile;