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

export default chunk;