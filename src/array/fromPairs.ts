export const fromPairs = <K extends string | number | symbol, T>(
  arr: Array<any[]>,
): Record<K, T> => {
  const record: Record<K, T> = {} as Record<K, T>;
  for (const tuple of arr) {
    if (["string", "number", "symbol"].includes(typeof tuple[0])) {
      record[tuple[0] as K] = tuple[1];
    } else {
      throw new TypeError(`Element ${tuple} does not have a valid key`);
    }
  }
  return record;
};

export default fromPairs;
