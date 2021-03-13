export const partitionBy = <T>(
  fn: (val: T, i: number) => boolean,
  arr: T[],
) => {
  const trueArray: T[] = [];
  const falseArray: T[] = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    if (fn(arr[i], i)) {
      trueArray.push(arr[i]);
    } else {
      falseArray.push(arr[i]);
    }
  }
  return [trueArray, falseArray];
};

export default partitionBy;
