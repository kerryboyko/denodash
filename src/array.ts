export const chunk = <T>(arr: T[], size = 1): T[][] => {
  size = Math.floor(size);
  const output: T[][] = [];
  if (size > 0) {
    for (let i = 0, l = arr.length; i < l; i += size) {
      output.push(arr.slice(i, i + size));
    }
  }
  return output;
};

// concat is natively replaced by Array.prototype.concat

// compact can be trivially replaced:
/* 
const compact = (arr) => arr.filter(x => !!x);
*/

export const differenceBy = <T>(
  a: T[],
  b: T[],
  iteratee: (x: any) => T = (x) => x as T
) => {
  const diffs: T[] = [];
  const bMap = b.map(iteratee);
  for (const val of a) {
    if (!bMap.includes(iteratee(val))) {
      diffs.push(val);
    }
  }
  return diffs;
};

export const difference = differenceBy;

export const differenceWith = <T>(
  a: T[],
  b: T[],
  comparator: (a1: T, b1: T) => boolean = (a1, b1) => a1 === b1
) => {
  const diffs: T[] = [];
  for (const val of a) {
    if (!b.some((bVal) => comparator(val, bVal))) {
      diffs.push(val);
    }
  }
  return diffs;
};

// drop can be trivially replaced:
/* 
const drop = (arr, n) => arr.slice(n)
*/

export const dropWhile = <T>(arr: T[], predicate: (x: T) => boolean): T[] => {
  let i = 0;
  const l = arr.length;
  while (predicate(arr[i]) && i < l) {
    i += 1;
  }
  return arr.slice(i);
};

export const dropWhileRight = <T>(
  arr: T[],
  predicate: (x: T) => boolean
): T[] => {
  const l = arr.length;
  let i = l - 1;
  while (predicate(arr[i]) && i >= 0) {
    i -= 1;
  }
  return arr.slice(0, i + 1);
};

// fill is natively replaced by Array.prototype.fill

// findIndex is natively replaced by Array.prototype.findIndex;

export const findLastIndex = <T>(
  arr: T[],
  predicate: (x: T) => boolean
): number => {
  const l = arr.length;
  let i = l - 1;
  while (!predicate(arr[i]) && i >= 0) {
    i -= 1;
  }
  return i;
};

export const flattenDepth = (arr: any[], level = 1, currLevel = 1) => {
  const clone = arr.slice();
  if (level === 0) {
    return clone;
  }
  let output: any = [];
  while (clone.length) {
    let elem = clone.shift();
    output = output.concat(
      Array.isArray(elem) && currLevel < level
        ? flattenDepth(elem, level, currLevel + 1)
        : elem
    );
  }
  return output;
};

export const flatten = (arr: any[]) => flattenDepth(arr, 1);

export const flattenDeep = (arr: any[]) =>
  flattenDepth(arr, Number.MAX_SAFE_INTEGER);

export const fromPairs = <K extends string | number | symbol, T>(
  arr: Array<any[]>
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
