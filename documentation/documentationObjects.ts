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
    description: `Takes two arrays (a, b) and an iteratee. It returns an array of elements in a where the return of iteratee(a) does not equal any return of the map of b over iteratee. In other words, after running the function on both, remove any elements where iteratee(a) matches any iteratee(b)`,
  },
  {
    name: "differenceWith",
    signature: `<T>(
        comparator: Comparator<T>,
        a: T[],
        b: T[],
      )`,
    description: `Takes two arrays (a, b) and a comparator (which will return a boolean). It returns an array of elements in a where no element in b returns true for comparator(elemA, elemB)`,
  },
  {
    name: "dropWhile",
    signature: `<T>(
      arr: T[],
      predicate: Predicate<T>,
    ): T[] `,
    description: `Takes an array (arr) and a Predicate (predicate) which will return boolean. It iterates over the array and will drop (or more accurately, not copy) all elements until it reaches an element where predicate(element) returns false. It returns a new array.`,
  },
  {
    name: "dropWhileRight",
    signature: `<T>(
      arr: T[],
      predicate: Predicate<T>,
    ): T[]`,
    description: `Takes an array (arr) and a Predicate (predicate) which will return boolean. It iterates over the array starting from the last element in the array, towards the first element, and will drop (or more accurately, not copy) all elements until it reaches an element where predicate(element) returns false. It returns a new array.`,
  },
  {
    name: "dropWhileRight",
    signature: `<T>(
      arr: T[],
      predicate: Predicate<T>,
    ): T[]`,
    description: `Takes an array (arr) and a Predicate (predicate) which will return boolean. It iterates over the array starting from the last element in the array, towards the first element, and will drop (or more accurately, not copy) all elements until it reaches an element where predicate(element) returns false. It returns a new array.`,
  },
  {
    name: "findLastIndex",
    signature: `<T>(
      arr: T[],
      predicate: Predicate<T>,
    ): number`,
    description: `Takes an array (arr) and a Predicate (predicate) and finds the last index in the array where predicate(arr[index]) returns true`,
  },
  {
    name: "flatten",
    signature: `(arr: any[]): any[]`,
    description: `Takes an array (arr) and flattens it one level`,
  },
  {
    name: "flattenDeep",
    signature: `(arr: any[]): any[]`,
    description: `Takes an array (arr) and flattens it until it is completely flat`,
  },
  {
    name: "flattenDepth",
    signature: `(arr: any[], level: number = 1): any[]`,
    description: `Takes an array (arr) and flattens it by (level) levels. There is a third parameter, currLevel, which is only used internally for recursion.`,
  },
  {
    name: "fromPairs",
    signature: `<K extends string | number | symbol, T>(
      arr: Array<[K, T]>,
    ): Record<K, T>`,
    description: `Takes an array of tuples of [key: K, value: T] and returns an object where {[key: k]: value}`,
  },
].map((ado) => ({
  ...ado,
  testFile: "src/array.test.ts",
  sourceFile: `src/array/${ado.name}.ts`,
  signature: `${ado.name} = ${ado.signature}`,
}));

const docObjects = [...arrayDocObjects];

export default docObjects;
