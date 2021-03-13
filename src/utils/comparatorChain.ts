import type { SortComparator } from "../types/SortComparator.d.ts";

export const comparatorChain = <T>(...comparators: SortComparator<T>[]) =>
  (
    a: T,
    b: T,
  ) => {
    const l = comparators.length;
    let depth = 0;
    let result = 0;

    while (result === 0 && depth < l) {
      result = comparators[depth](a, b);
      depth += 1;
    }
    return result;
  };

export default comparatorChain;
