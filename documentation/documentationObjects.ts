export interface DocObject {
  name: string;
  sourceFile: string;
  testFile: string;
  signature: string;
  description: string;
}

const arrayDocObjects = [
  {
    name: "cartesianProduct",
    signature: "<T, U>(a: T[], b: U[]): [T, U][]",
    description:
      "Takes two arrays of type T and type U respectively, and creates an array of tuple type [T, U] for every combination of the elements of a and b.",
  },
  {
    name: "chunk",
    signature: "<T>(arr: T[], size: number = 1): T[][]",
    description:
      "Takes an array (arr) and splits it into multiple arrays of size (size)",
  },
  {
    name: "chunkIntoParts",
    signature: "<T>(arr: T[], parts = 1): T[][]",
    description:
      "Takes an array (arr) and splits it into multiple parts (parts) of equal size. For example: an array of length 10 split into 3 parts would be split into 4, 4, and 2 parts",
  },
  {
    name: "difference",
    signature: "<T>(a: T[], b: T[]): T[]",
    description:
      "Takes two arrays (a, b) and returns an array of elements in a that do not exist in b",
  },
  {
    name: "differenceBy",
    signature: "<T>(iteratee: Iteratee<T, any>, a: T[], b: T[]): T[]",
    description:
      `Takes two arrays (a, b) and an iteratee. It returns an array of elements in a where the return of iteratee(a) does not equal any return of the map of b over iteratee. In other words, after running the function on both, remove any elements where iteratee(a) matches any iteratee(b)`,
  },
  {
    name: "differenceWith",
    signature: `<T>(
        comparator: Comparator<T>,
        a: T[],
        b: T[],
      )`,
    description:
      `Takes two arrays (a, b) and a comparator (which will return a boolean). It returns an array of elements in a where no element in b returns true for comparator(elemA, elemB)`,
  },
  {
    name: "dropWhile",
    signature: `<T>(
      arr: T[],
      predicate: Predicate<T>,
    ): T[] `,
    description:
      `Takes an array (arr) and a Predicate (predicate) which will return boolean. It iterates over the array and will drop (or more accurately, not copy) all elements until it reaches an element where predicate(element) returns false. It returns a new array.`,
  },
  {
    name: "dropWhileRight",
    signature: `<T>(
      arr: T[],
      predicate: Predicate<T>,
    ): T[]`,
    description:
      `Takes an array (arr) and a Predicate (predicate) which will return boolean. It iterates over the array starting from the last element in the array, towards the first element, and will drop (or more accurately, not copy) all elements until it reaches an element where predicate(element) returns false. It returns a new array.`,
  },
  {
    name: "dropWhileRight",
    signature: `<T>(
      arr: T[],
      predicate: Predicate<T>,
    ): T[]`,
    description:
      `Takes an array (arr) and a Predicate (predicate) which will return boolean. It iterates over the array starting from the last element in the array, towards the first element, and will drop (or more accurately, not copy) all elements until it reaches an element where predicate(element) returns false. It returns a new array.`,
  },
  {
    name: "findLastIndex",
    signature: `<T>(
      arr: T[],
      predicate: Predicate<T>,
    ): number`,
    description:
      `Takes an array (arr) and a Predicate (predicate) and finds the last index in the array where predicate(arr[index]) returns true`,
  },
  {
    name: "flatten",
    signature: `(arr: any[]): any[]`,
    description: `Takes an array (arr) and flattens it one level`,
  },
  {
    name: "flattenDeep",
    signature: `(arr: any[]): any[]`,
    description:
      `Takes an array (arr) and flattens it until it is completely flat`,
  },
  {
    name: "flattenDepth",
    signature: `(arr: any[], level: number = 1): any[]`,
    description:
      `Takes an array (arr) and flattens it by (level) levels. There is a third parameter, currLevel, which is only used internally for recursion.`,
  },
  {
    name: "fromPairs",
    signature: `<K extends string | number | symbol, T>(
      arr: Array<[K, T]>,
    ): Record<K, T>`,
    description:
      `Takes an array of tuples of [key: K, value: T] and returns an object where {[key: k]: value}`,
  },
  {
    name: "intersection",
    signature: `<T>(...arrays: T[][]): T[]`,
    description:
      `Takes any number of arrays and returns every element that occurs in each array. The order is determined by the first array passed in.`,
  },
  {
    name: "intersectionBy",
    signature: `<T>(fn: Iteratee<T, any>, ...arrays: T[][]): T[]`,
    description:
      `Takes any number of arrays and returns every element in the first array where iteratee(elementOfFirst) has the same value as iteratee(oneOfTheElementsOfTheOtherArray/s)`,
  },
  {
    name: "intersectionWith",
    signature: `<T>(
      comparator: Comparator<T>,
      ...arrays: T[][]
    ): T[]`,
    description:
      `Takes any number of arrays and returns every element in the first array where some element of each of the other arrays returns true when placed in the comparator with the element from the first array`,
  },
  {
    name: "lastIndexOf",
    signature: `<T>(arr: T[], target: T): number`,
    description:
      `Finds the last index of array (arr) that is the target (target) and returns the index`,
  },
  {
    name: "partition",
    signature: `<T>(arr: T[], filterArray: boolean[]): [T[], T[]]`,
    description:
      `Divides an array of elements into two seperate arrays. If the value in filterArray[index] is true, then arr[index] is placed in the first array of the returned tuple; otherwise it is placed in the second`,
  },
  {
    name: "partitionBy",
    signature: `<T>(
      fn: (val: T, i: number) => boolean,
      arr: T[],
    ): [T[], T[]]`,
    description:
      `Divides an array of elements into two seperate arrays. If fn(arr[index]) returns true, then arr[index] is placed in the first array in the returned tuple, otherwise it is placed in the second.`,
  },
  {
    name: "shank",
    signature: `<T>(
      arr: T[],
      index: number = 0,
      delCount: number = 0,
      ...elements: T[]
    ): T[]`,
    description:
      `Works exactly like [Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), but returns a new array,
    rather than mutating the original.`,
  },
  {
    name: "union",
    signature: `<T>(...arrays: T[][]): T[]`,
    description:
      `Creates an array of unique values, in order, from all given arrays.`,
  },
  {
    name: "unionBy",
    signature: `<T>(fn: Iteratee<T, any>, ...arrays: T[][]): T[]`,
    description:
      `Creates an array of values that result in a unique value when passed through fn, in order`,
  },
  {
    name: "unionWith",
    signature: `<T>(comparator: Comparator<T>, ...arrays: T[][]): T[]`,
    description:
      `Creates an array of values where every value does equals false when passed in a comparator with every other value`,
  },
  {
    name: "unzip",
    signature: `(arrays: any[][]): any[][]`,
    description:
      `accepts an array of grouped elements and creates an array regrouping the elements to their pre-zip configuration.`,
  },
  {
    name: "xor",
    signature: `(...arrays: any[][]): any[]`,
    description:
      `Creates an array of elements where the element appears in one and only one of the arrays`,
  },
  {
    name: "zip",
    signature: `(...arrays: any[][]): any[]`,
    description:
      `Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.`,
  },
].map((ado) => ({
  ...ado,
  testFile: "src/array.test.ts",
  sourceFile: `src/array/${ado.name}.ts`,
  signature: `${ado.name} = ${ado.signature}`,
}));

const collectionDocObjects = [
  {
    name: "count",
    signature: `<T>(
    arr: T[],
  ): Record<string, number>`,
    description:
      `Counts the number of occurances of each element and returns a Record<element as string, number> count of elements`,
  },
].map((cdo) => ({
  ...cdo,
  testFile: "src/collection.test.ts",
  sourceFile: `src/collection/${cdo.name}.ts`,
  signature: `${cdo.name} = ${cdo.signature}`,
}));

const docObjects = [...arrayDocObjects, ...collectionDocObjects];

export default docObjects;
