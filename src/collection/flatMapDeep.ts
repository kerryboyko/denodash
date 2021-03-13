import flatMapDepth from "./flatMapDepth.ts";
import type { Iteratee } from "../types/Iteratee.d.ts";
// Array.prototype.flatMap does not have Internet Explorer 11 support.
export const flatMapDeep = <T, U>(iteratee: Iteratee<T, U>, 
  arr: T[]
): U[] => flatMapDepth(iteratee, arr, Number.MAX_SAFE_INTEGER);

export default flatMapDeep;
