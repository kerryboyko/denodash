import randomOf from '../utils/randomOf.ts';

export const sample = <T>(array: T[], sampleSize: number = 1): T[] => {
  const clone = array.slice();
  const l = array.length;
  let r: number; // random number;
  let temp: T; // storage;
  for(let i = 0; i < sampleSize; i++){
    r = randomOf(l);
    temp = clone[r];
    clone[r] = clone[i];
    clone[i] = temp; 
  }
  return clone.slice(0, sampleSize);
}

export default sample;