export const overArgs = (fn: Function, mapFuncs: Function[]) => (
  ...args: any[]
) =>
  fn(
    ...args.map((arg: any, i: number) =>
      mapFuncs[i] === undefined ? arg : mapFuncs[i](arg)
    )
  );
export default overArgs;
