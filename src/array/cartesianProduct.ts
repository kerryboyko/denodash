export const cartesianProduct = <T, U>(a: T[], b: U[]): [T, U][] => {
  const output: [T, U][] = [];
  for (const aElem of a) {
    for (const bElem of b) {
      output.push([aElem, bElem]);
    }
  }
  return output;
};

export default cartesianProduct;
