export const bifurcateBy = <T>(arr: T[], fn: (val: T, i: number) => boolean) =>
  arr.reduce((acc: [T[], T[]], val: T, i: number) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [
    [],
    [],
  ]);

export default bifurcateBy;
