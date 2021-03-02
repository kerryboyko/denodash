import type { Iteratee } from "../types/Iteratee.d.ts";

export const differenceBy = <T>(iteratee: Iteratee<T>) => (a: T[], b: T[]) => {
  const diffs: T[] = [];
  const bMap = b.map(iteratee);
  for (const val of a) {
    if (!bMap.includes(iteratee(val))) {
      diffs.push(val);
    }
  }
  return diffs;
};

export default differenceBy;
