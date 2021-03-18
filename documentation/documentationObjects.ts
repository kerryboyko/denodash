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
  {
    name: "intersection",
    signature: `<T>(...arrays: T[][]): T[]`,
    description: `Takes any number of arrays and returns every element that occurs in each array. The order is determined by the first array passed in.`,
  },
  {
    name: "intersectionBy",
    signature: `<T>(fn: Iteratee<T, any>, ...arrays: T[][]): T[]`,
    description: `Takes any number of arrays and returns every element in the first array where iteratee(elementOfFirst) has the same value as iteratee(oneOfTheElementsOfTheOtherArray/s)`,
  },
  {
    name: "intersectionWith",
    signature: `<T>(
      comparator: Comparator<T>,
      ...arrays: T[][]
    ): T[]`,
    description: `Takes any number of arrays and returns every element in the first array where some element of each of the other arrays returns true when placed in the comparator with the element from the first array`,
  },
  {
    name: "lastIndexOf",
    signature: `<T>(arr: T[], target: T): number`,
    description: `Finds the last index of array (arr) that is the target (target) and returns the index`,
  },
  {
    name: "partition",
    signature: `<T>(arr: T[], filterArray: boolean[]): [T[], T[]]`,
    description: `Divides an array of elements into two seperate arrays. If the value in filterArray[index] is true, then arr[index] is placed in the first array of the returned tuple; otherwise it is placed in the second`,
  },
  {
    name: "partitionBy",
    signature: `<T>(
      fn: (val: T, i: number) => boolean,
      arr: T[],
    ): [T[], T[]]`,
    description: `Divides an array of elements into two seperate arrays. If fn(arr[index]) returns true, then arr[index] is placed in the first array in the returned tuple, otherwise it is placed in the second.`,
  },
  {
    name: "shank",
    signature: `<T>(
      arr: T[],
      index: number = 0,
      delCount: number = 0,
      ...elements: T[]
    ): T[]`,
    description: `Works exactly like [Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), but returns a new array,
    rather than mutating the original.`,
  },
  {
    name: "union",
    signature: `<T>(...arrays: T[][]): T[]`,
    description: `Creates an array of unique values, in order, from all given arrays.`,
  },
  {
    name: "unionBy",
    signature: `<T>(fn: Iteratee<T, any>, ...arrays: T[][]): T[]`,
    description: `Creates an array of values that result in a unique value when passed through fn, in order`,
  },
  {
    name: "unionWith",
    signature: `<T>(comparator: Comparator<T>, ...arrays: T[][]): T[]`,
    description: `Creates an array of values where every value does equals false when passed in a comparator with every other value`,
  },
  {
    name: "unzip",
    signature: `(arrays: any[][]): any[][]`,
    description: `accepts an array of grouped elements and creates an array regrouping the elements to their pre-zip configuration.`,
  },
  {
    name: "xor",
    signature: `(...arrays: any[][]): any[]`,
    description: `Creates an array of elements where the element appears in one and only one of the arrays`,
  },
  {
    name: "zip",
    signature: `(...arrays: any[][]): any[]`,
    description: `Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.`,
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
    description: `Counts the number of occurances of each element and returns a Record<element as string, number> count of elements`,
  },
  {
    name: "countBy",
    signature: `<T>(
      iteratee: Iteratee<T, any>,
      arr: T[],
    ): Record<string, number>`,
    description: `Runs each element through a iteratee, and returns a count of how many times the result occurs. Returns Record<element as string, number> count of results`,
  },
  {
    name: "flatMapDeep",
    signature: `<T, U>(iteratee: Iteratee<T, U>, arr: T[]): U[]`,
    description: `Runs each element through a iteratee, and returns a flatMap of the results after being run through iteratee. T is the parameter type of iteratee, U is the return type of the iteratee, which may or may not be the same type.`,
  },
  {
    name: "flatMapDepth",
    signature: `<T, U>(
      iteratee: Iteratee<T, U>,
      arr: T[],
      depth: number = Number.MAX_SAFE_INTEGER,
    ): U[]`,
    description: `Runs each element through a iteratee, and returns a flatMap of the results after being run through iteratee. T is the parameter type of iteratee, up to a number of levels specified.`,
  },
  {
    name: "groupBy",
    signature: `<T>(
      iteratee: Iteratee<T, any>,
      arr: T[],
    ): Record<string, T[]>`,
    description: `Groups elements of an array of type T according to a criteria provided (iteratee) as a Record of arrays of type T`,
  },
  {
    name: "keyBy",
    signature: `<T extends Record<string, any>>(
      argument: Iteratee<T, string> | string,
      arr: T[],
    ): Record<string, T>`,
    description: `Creates an object composed of keys generated from the results of running each element of collection thru iteratee if a function is provide, or through (elem)=> elem[argument] if argument is a string. Input must be a Record (i.e., a key-value object with strings as keys)`,
  },
  {
    name: "sample",
    signature: `<T>(array: T[], sampleSize: number = 1): T[]`,
    description: `Randomly picks n (sampleSize) elements from an array. The same element will not be picked twice.`,
  },
  {
    name: "sampleOne",
    signature: `<T>(array: T[]): T`,
    description: `Randomly picks one random element from an array`,
  },
  {
    name: "shuffle",
    signature: `<T>(array: T[]): T[]`,
    description: `Implements a Fischer-Yates shuffler. Takes an array and returns a new array with the same elements but randomly shuffled.`,
  },
  {
    name: "sortBy",
    signature: `<T>(
      array: T[],
      ...comparators: SortComparator<T>[]
    ): T[]`,
    description: `Returns a copy of the array provided, sorted by the criteria provided (comparators). Comparators are prioritized from first to last.`,
  },
].map((cdo) => ({
  ...cdo,
  testFile: "src/collection.test.ts",
  sourceFile: `src/collection/${cdo.name}.ts`,
  signature: `${cdo.name} = ${cdo.signature}`,
}));

const functionDocObjects = [
  {
    name: "after",
    signature: `(
      n: number,
      fn: Function
    ): ((...args: any) => any | void)`,
    description: `Invokes the provided function *only* after it has been called n times (inclusive). In other words, if n is 3, it will not be called on the first or second invocation, but will be called on the third.`,
  },
  {
    name: "before",
    signature: `(
      n: number,
      fn: Function
    ): ((...args: any) => any | void)`,
    description: `Creates a function that invokes fn up to only n times. Subsequent calls will return the value returned on the nth invocation.`,
  },
  {
    name: "debounce",
    signature: `(func: Function, wait = 0, immediate = false): {
      (...args: any[]): any;
      cancel(): void;
    }`,
    description: `Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. The debounced function comes with a cancel method to cancel delayed func invocations.
      
_This method is specifically requested for additional testing and code review._`,
  },
  {
    name: "defer",
    signature: `(fn: Function, ...args: any[]): void`,
    description: `Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to func when it's invoked.
      
_This method is specifically requested for additional testing and code review._`,
  },
  {
    name: "memoize",
    signature: `
    (
      fn: Function,
      hashingFn: HashingFunction = normalHashingFunction
    ): ((...args: any[]) => any)

    /* type HashingFunction = (...args: any[]) => string; */
    `,
    description: `Creates a function that memoizes the result of func by the result of a hashing function. If no hashing function is provided, it uses normalHashingFunction, which is (...args) => JSON.stringify(args)`,
  },
  {
    name: "once",
    signature: `(fn: Function): ((...args: any) => any | void)`,
    description: `Creates a function that only runs once. Further invocations will return the same value as originally resolved.`,
  },
  {
    name: "overArgs",
    signature: `(
      fn: Function,
      mapFuncs: Function[],
      ...args: any[]
    ): any`,
    description: `Maps the arguments (args) through the mapping functions (mapFuncs) and is then passed to fn and returns the result of fn with the mapped arguments`,
  },
  {
    name: "throttle",
    signature: `(
      func: Function,
      wait = 0,
      options: ThrottleOptions = { leading: true, trailing: true },
    ): {
      (...args: any[]): any;
      cancel(): void;
    }`,
    description: `Creates a throttled function that only invokes func at most once per every wait milliseconds.
    
_This method is specifically requested for additional testing and code review._`,
  },
].map((fdo) => ({
  ...fdo,
  testFile: "src/function.test.ts",
  sourceFile: `src/function/${fdo.name}.ts`,
  signature: `${fdo.name} = ${fdo.signature}`,
}));

const langDocObjects = [
  {
    name: "cloneDeep",
    signature: `(value: any): any | never`,
    description: `Creates a deep clone of the value passed into it. All primatives are copied by value, but new objects are created instead of passing these elements by reference.`,
  },
  {
    name: "isEqual",
    signature: `Comparator<any> // i.e., (a: any, b: any) => boolean`,
    description: `Determines if the value of a and b are equal, even if the references are not equal. `,
  },
].map((ldo) => ({
  ...ldo,
  testFile: "src/lang.test.ts",
  sourceFile: `src/lang/${ldo.name}.ts`,
  signature: `${ldo.name} = ${ldo.signature}`,
}));

const objectDocObjects = [
  {
    name: "findKeys",
    signature: `(
      obj: Record<string, any>,
      predicate: Predicate<any>,
    ): string[]`,
    description: `Returns a sorted list of all keys where the value at the key, run through predicate, returns true`,
  },
  {
    name: "get",
    signature: `(
      obj: Record<string | number, any>,
      path: string | Array<string | number>,
      retValueIfUndef?: any,
    ): any`,
    description: `Gets the value of an object at the property path, which may be expressed as a string or an array of string | number. If the property path does not exist, returns the "retValueIfUndef" value provided.`,
  },
  {
    name: "invert",
    signature: `(obj: Record<string, any>): Record<string, string>`,
    description: `Inverts the keys and values of the record provided. Throws an error if any value is not serializable to a string`,
  },
  {
    name: "mapObject",
    signature: `<T, U>(
      obj: Record<ObjectKey, T>,
      iteratee: Iteratee<T, U>,
    ): Record<ObjectKey, U>`,
    description: `Maps over the object in a record and returns a new record with the results of that function on the same keys. Execution order is not guaranteed.`,
  },
  {
    name: "omit",
    signature: `(
      obj: Record<string | number, any>,
      props: Array<string | number>,
    ): Record<string | number, any>`,
    description: `Returns a copy of the record (obj) provided, without the keys specified in props.`,
  },
  {
    name: "pick",
    signature: `(
      obj: Record<string | number, any>,
      props: Array<string | number>,
    ): Record<string | number, any>`,
    description: `Returns a copy of the record (obj) provided, with ONLY the keys specified in props.`,
  },
].map((odo) => ({
  ...odo,
  testFile: "src/object.test.ts",
  sourceFile: `src/object/${odo.name}.ts`,
  signature: `${odo.name} = ${odo.signature}`,
}));

const utilsDocObjects = [
  {
    name: "comparatorChain",
    signature: `<T>(
      ...comparators: SortComparator<T>[]
    ): SortComparator<T>`,
    description: `Creates a single sort comparator out of several sort parameters. The first sort comparator passed in has priority, followed by the rest.`,
  },
  {
    name: "delay",
    signature: `(time: number, fn?: Function, ...args: any[]): Promise<any>`,
    description: `Creates a promise which resolves only after a number of milliseconds (time) has passed.`,
  },
  {
    name: "identity",
    signature: `<T>(x: T): T `,
    description: `A function which returns the value passed in as a parameter. (Useful as a default function)`,
  },
  {
    name: "randomOf",
    signature: `(max: number): number`,
    description: `Returns a random number (an integer) between 0 and the maximum (non-inclusive)`,
  },
].map((udo) => ({
  ...udo,
  testFile: "src/utils.test.ts",
  sourceFile: `src/utils/${udo.name}.ts`,
  signature: `${udo.name} = ${udo.signature}`,
}));

const docObjects = [
  ...arrayDocObjects,
  ...collectionDocObjects,
  ...functionDocObjects,
  ...langDocObjects,
  ...objectDocObjects,
  ...utilsDocObjects,
];

export default docObjects;
