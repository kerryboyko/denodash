import type { SortComparator } from "../types/SortComparator.d.ts";
import comparatorChain from "../utils/comparatorChain.ts";
import mergeSort from "../utils/mergeSort.ts";

export const sortBy = <T>(...comparators: SortComparator<T>[]) => (array: T[]): T[] =>
  mergeSort(comparatorChain<T>(...comparators))(array);

export default sortBy;