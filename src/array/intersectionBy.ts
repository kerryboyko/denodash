import type {Iteratee} from '../types/Iteratee.d.ts';

const intersectionByNormalized = <T>(arrays: T[][], fn: Iteratee<T>): T[] => {
  const baseArray = arrays[0];
  const matchingArrays = arrays.slice(1);
  const matches: T[] = [];
  for (const elem of baseArray) {
    const converted = fn(elem);
    if (
      matchingArrays.every((matchingArray) =>
        matchingArray.map(fn).includes(converted)
      )
    ) {
      matches.push(elem);
    }
  }
  return matches;
};

export const intersectionBy = <T>(...args: Array<T[] | Iteratee<T>>) => {
  let cursor = 0;
  while (Array.isArray(args[cursor])) {
    cursor += 1;
  }
  const fn: Iteratee<T> = (typeof args[cursor + 1] === "function"
    ? args[cursor + 1] as Iteratee<T>
    : (x: T): T => x);

  return intersectionByNormalized<T>(
    (args.slice(0, cursor) as unknown) as T[][],
    fn
  );
};
