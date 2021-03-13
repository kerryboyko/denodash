/* Works exactly like Array.prototype.splice, but returns a new array,
   rather than mutating the original. */

export const shank = <T>(
  arr: T[],
  index = 0,
  delCount = 0,
  ...elements: T[]
): T[] =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));

export default shank;
