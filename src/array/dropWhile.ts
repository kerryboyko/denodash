import { Predicate } from "../types/Predicate.d.ts";

export const dropWhile = <T>(
  arr: T[],
  predicate: Predicate<T>,
): T[] => {
  const l = arr.length;
  let cursor = 0;
  while (cursor < l && predicate(arr[cursor])) {
    cursor += 1;
  }
  return arr.slice(cursor);
};

export default dropWhile;
