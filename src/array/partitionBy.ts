export const partitionBy = <T>(fn: (val: T, i: number) => boolean) => (arr: T[]) =>
  arr.reduce((acc: [T[], T[]], val: T, i: number) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [
    [],
    [],
  ]);

export default partitionBy;
