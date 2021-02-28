import type { Iteratee } from "../types/Iteratee.d.ts";

export const differenceBy = <T>(
  a: T[],
  b: T[],
  iteratee: Iteratee<T> = (x: T): T => x
) => {
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
