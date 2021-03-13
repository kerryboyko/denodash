import type { SortComparator } from "../types/SortComparator.d.ts";
import comparatorChain from "../utils/comparatorChain.ts";

export const sortBy = <T>(
  array: T[],
  ...comparators: SortComparator<T>[]
): T[] => {
  const chain = comparatorChain<T>(...comparators);
  return array.slice().sort((a, b) => chain(a, b));
};
export default sortBy;
