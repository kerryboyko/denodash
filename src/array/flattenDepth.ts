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
        : elem,
    );
  }
  return output;
};

export default flattenDepth;
