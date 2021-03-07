import type { Iteratee } from "../types/Iteratee.d.ts";

export const groupBy = <T>(iteratee: Iteratee<T, any>) => (
  arr: T[]
): Record<string, T[]> => {
  const output: Record<string, Array<T>> = {};
  for (const elem of arr) {
    const key = iteratee(elem).toString();
    if (output[key] === undefined) {
      output[key] = [];
    }
    output[key].push(elem);
  }
  return output;
};

export default groupBy;
