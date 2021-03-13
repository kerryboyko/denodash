import randomOf from "../utils/randomOf.ts";

export const shuffle = <T>(array: T[]): T[] => {
  const clone = array.slice();
  const l = array.length;
  let r: number; // random number;
  let temp: T; // storage;
  for (let i = 0; i < l; i++) {
    r = randomOf(l);
    temp = clone[r];
    clone[r] = clone[i];
    clone[i] = temp;
  }
  return clone;
};

export default shuffle;
