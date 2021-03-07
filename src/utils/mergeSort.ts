import type { SortComparator } from "../types/SortComparator.d.ts";

const mergeSort = <T>(
  comparator: SortComparator<T>
) =>
  (() => {
    const merge = (
      array: T[],
      start: number,
      middle: number,
      end: number
    ): T[] => {
      const left: T[] = [];
      const right: T[] = [];
      const leftSize = middle - start;
      const rightSize = end - middle;
      const maxSize = Math.max(leftSize, rightSize);
      const size = end - start;
      for (let i = 0; i < maxSize; i++) {
        if (i < leftSize) {
          left[i] = array[start + i];
        }
        if (i < rightSize) {
          right[i] = array[middle + i];
        }
      }
      for (let i = 0; i < size; i++) {
        if (left.length > 0 && right.length > 0) {
          array[start + i] = (comparator(left[0], right[0]) > 0
            ? right.shift()
            : left.shift()) as T;
        } else if (left.length > 0) {
          array[start + i] = left.shift() as T;
        } else {
          array[start + i] = right.shift() as T;
        }
      }
      return array;
    };

    const merger = (array: T[], start: number, end: number): T[] => {
      if (Math.abs(end - start) <= 1) {
        return [];
      }
      const middle = Math.ceil((start + end) / 2);

      merger(array, start, middle);
      merger(array, middle, end);
      return merge(array, start, middle, end);
    };

    return (array: T[]) => merger(array.slice(), 0, array.length);
  })();

export default mergeSort;
