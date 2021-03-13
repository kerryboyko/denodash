import type { Iteratee } from "../types/Iteratee.d.ts";

export const keyBy = <T extends Record<string, any>>(
  argument: Iteratee<T, string> | string,
  arr: T[]
): Record<string, T> => {
  const iter =
    typeof argument === "string" ? (x: T) => x[argument].toString() : argument;
  const output: Record<string, T> = {};
  for (const elem of arr) {
    const key = iter(elem).toString();
    output[key] = elem;
  }
  return output;
};

export default keyBy;
