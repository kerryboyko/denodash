import type { Iteratee } from "../types/Iteratee.d.ts";

const intersectionBy = <T>(fn: Iteratee<T>, ...arrays: T[][]): T[] => {
  const baseArray = arrays[0];
  const matchingArrays = arrays.slice(1);
  const matches: T[] = [];
  for (const elem of baseArray) {
    const converted = fn(elem);
    if (
      matchingArrays.every((matchingArray) =>
        matchingArray.map(fn).includes(converted)
      )
    ) {
      matches.push(elem);
    }
  }
  return matches;
};

export default intersectionBy;