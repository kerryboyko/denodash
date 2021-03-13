import type { Comparator } from "../types/Comparator.d.ts";

const intersectionWith = <T>(comparator: Comparator<T>, 
  ...arrays: T[][]
): T[] => {
  const baseArray = arrays[0];
  const matchingArrays = arrays.slice(1);
  const matches: T[] = [];
  for (const baseElem of baseArray) {
    if (
      matchingArrays.every((matchingArray) =>
        matchingArray.some((matchElem) => comparator(baseElem, matchElem))
      )
    ) {
      matches.push(baseElem);
    }
  }
  return matches;
};

export default intersectionWith;
