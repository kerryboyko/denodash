import type { Comparator } from "../types/Comparator.d.ts";

const unionWith = <T>(comparator: Comparator<T>, ...arrays: T[][]): T[] => {
  const matchingArrays = [].concat(...arrays);
  const matches: T[] = [];
  for (const elem of matchingArrays) {
    if (!matches.some((previousMatch) => comparator(elem, previousMatch))) {
      matches.push(elem);
    }
  }
  return matches;
};

export default unionWith;
