import type {Comparator} from '../types/Comparator';

export const differenceWith = <T>(
  a: T[],
  b: T[],
  comparator: Comparator<T> = (a1, b1) => a1 === b1
) => {
  const diffs: T[] = [];
  for (const val of a) {
    if (!b.some((bVal) => comparator(val, bVal))) {
      diffs.push(val);
    }
  }
  return diffs;
};

export default differenceWith