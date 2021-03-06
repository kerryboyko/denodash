import flattenDeep from "../array/flatten.ts";
import { Iteratee } from "../types/Iteratee.d.ts";

// Array.prototype.flatMap does not have Internet Explorer 11 support.
export const flatMapDeep = <T, U>(iteratee: Iteratee<T, U>) => (arr: T[]): U[] =>
  flattenDeep(arr.flatMap(iteratee));

export default flatMapDeep;