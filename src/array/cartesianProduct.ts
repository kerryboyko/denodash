export const cartesianProduct = <T, U>(a: T[], b: U[]): [T, U][] => {
  const output: [T, U][] = []; 
  for(const aElem of a){
    for(const bElem of b){
      output.push([aElem, bElem]);
    }
  }
  return output;
}

export default cartesianProduct;

/* 
cartesianProduct(['x', 'y'], [1, 2]);
// [['x', 1], ['x', 2], ['y', 1], ['y', 2]]
*/