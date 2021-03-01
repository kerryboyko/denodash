import { Predicate } from "../types/Predicate.d.ts";

export const findLastIndex = <T>(
  arr: T[],
  predicate: Predicate<T>
): number => {
  const l = arr.length;
  let i = l - 1;
  while (!predicate(arr[i]) && i >= 0) {
    i -= 1;
  }
  return i;
};

export default findLastIndex;