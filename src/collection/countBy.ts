import type { Iteratee } from "../types/Iteratee.d.ts";

export const countBy = <T>(iteratee: Iteratee<T, any>) => (
  arr: T[]
): Record<string, number> => {
  const output: Record<string, number> = {};
  for(const elem of arr){
    const key = iteratee(elem).toString();
    output[key] = output[key] === undefined ? 1 : output[key] + 1;
  }
  return output;
};

export default countBy
