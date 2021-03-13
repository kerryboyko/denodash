import flattenDepth from "../array/flattenDepth.ts";
import { Iteratee } from "../types/Iteratee.d.ts";

// Array.prototype.flatMap does not have Internet Explorer 11 support.
export const flatMapDepth = <T, U>(
  iteratee: Iteratee<T, U>,
  arr: T[],
  depth: number = Number.MAX_SAFE_INTEGER
): U[] => flattenDepth(arr.map(iteratee), depth);

export default flatMapDepth;
