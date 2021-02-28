export const intersection = <T>(...arrays: T[][]): T[] => {
  const baseArray = arrays[0]; 
  const matchingArrays = arrays.slice(1);
  const matches: T[] = [];
  for(const elem of baseArray){
    if(matchingArrays.every((matchingArray) => matchingArray.includes(elem))){
      matches.push(elem);
    }
  }
  return matches;
}

export default intersection;