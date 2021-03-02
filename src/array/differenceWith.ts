import type { Comparator } from "../types/Comparator.d.ts";

export const differenceWith = <T>(
  comparator: Comparator<T>
) => (a: T[], b: T[]) => {
  const diffs: T[] = [];
  for (const val of a) {
    if (!b.some((bVal) => comparator(val, bVal))) {
      diffs.push(val);
    }
  }
  return diffs;
};

export default differenceWith;
