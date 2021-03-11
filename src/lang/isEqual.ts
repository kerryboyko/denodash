import type { Comparator } from "../types/Comparator.d.ts";

const isEqual: Comparator<any> = (a, b) => {
  const typeA = typeof a;
  const typeB = typeof b;
  if (typeA !== typeB) {
    return false;
  }
  /* JS says NaN !== NaN, but we want that to return true for this function. */
  if (Number.isNaN(a)) {
    return Number.isNaN(b);
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
    if(a === null){
      return b === null;
    }
    const aEntries = Object.entries(a);
    const bEntries = Object.entries(b);
    return isEqual(aEntries, bEntries);
  }
  throw new Error(
    `You've tried running isEqual on something isEqual isn't meant for`
  );
};

export default isEqual;
