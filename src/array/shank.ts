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
