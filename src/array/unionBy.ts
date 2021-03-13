import type { Iteratee } from "../types/Iteratee.d.ts";

export const unionBy = <T>(fn: Iteratee<T, any>, ...arrays: T[][]): T[] => {
  const matchingArrays = ([] as T[]).concat(...arrays);
  const read = new Set<T>();
  const matches: T[] = [];
  for (const elem of matchingArrays) {
    if (!read.has(fn(elem))) {
      read.add(fn(elem));
      matches.push(elem);
    }
  }
  return matches;
};

export default unionBy;
