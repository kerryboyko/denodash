import type { Comparator } from "../types/Comparator.d.ts";

const isEqual: Comparator<any> = (a, b) => {
  const typeA = typeof a;
  const typeB = typeof b;
  if (typeA !== typeB) {
    return false;
  }
  // primatives
  if (
    [
      "string",
      "number",
      "boolean",
      "string",
      "bigint",
      "symbol",
      "null",
      "undefined",
      "function",
    ].includes(typeA)
  ) {
    return a === b;
  }
  // arrays
  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0, l = a.length; i < l; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  // objects
  if (typeA === "object") {
    const aEntries = Object.entries(a);
    const bEntries = Object.entries(b);
    return isEqual(aEntries, bEntries);
  }
  throw new Error(
    `You've tried running isEqual on something isEqual isn't meant for`
  );
};

// const cloneDeep = (value: any): any => {
//   const typeofValue = typeof value;
//   // primatives are copied by value.
//   if (
//     [
//       "string",
//       "number",
//       "boolean",
//       "string",
//       "bigint",
//       "symbol",
//       "null",
//       "undefined",
//       "function",
//     ].includes(typeofValue)
//   ) {
//     return value;
//   }
//   if (Array.isArray(value)) {
//     return value.map(cloneDeep);
//   }
//   if (typeofValue === "object") {
//     const clone: any = {};
//     for (let prop in value) {
//       clone[prop] = cloneDeep(value[prop]);
//     }
//     return clone;
//   }
//   throw new Error(`You've tried to clone something that can't be cloned`)
// };

// export default cloneDeep
