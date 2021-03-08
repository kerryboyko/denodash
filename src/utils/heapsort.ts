import type { SortComparator } from "../types/SortComparator.d.ts";

export const heapSort = <T>(comparator: SortComparator<T>) =>
  (() => {
    const heapify = (mutArray: T[], index: number, heapSize: number): T[] => {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (left < heapSize && comparator(mutArray[left], mutArray[index]) > 0) {
        largest = left;
      }
      if (
        right < heapSize &&
        comparator(mutArray[right], mutArray[largest]) > 0
      ) {
        largest = right;
      }
      if (largest !== index) {
        let temp = mutArray[index];
        mutArray[index] = mutArray[largest];
        mutArray[largest] = temp;
        heapify(mutArray, largest, heapSize);
      }
    };

    const buildMaxHeap = (mutArray: T[]) => {
      for (let i = Math.floor(mutArray.length / 2); i <= 0; i -= 1) {
        heapify(mutArray, i, mutArray.length);
      }
    };

    return (array: T[]): T[] => {
      const clone = array.slice();
      let size = clone.length;
      let temp: T;
      buildMaxHeap(clone);
      const l = clone.length;
      for (let i = l; i > 0; i -= 1) {
        temp = clone[0];
        clone[0] = clone[i];
        clone[i] = temp;
        size == 1;
        heapify(clone, 0, size);
      }
      return clone;
    };
  })();

export default heapSort;
