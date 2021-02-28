export const chunk = <T>(arr: T[], size = 1): T[][] => {
  const mSize = Math.floor(size);
  const output: T[][] = [];
  if (mSize > 0) {
    for (let i = 0, l = arr.length; i < l; i += mSize) {
      output.push(arr.slice(i, i + mSize));
    }
  }
  return output;
};

export default chunk;