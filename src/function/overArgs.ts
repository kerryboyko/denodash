export const overArgs = (fn: Function, mapFuncs: Function[]) => {
  return (...args: any[]) => {
    return fn(
      ...args.map((arg: any, i: number) => {
        return mapFuncs[i] === undefined ? arg : mapFuncs[i](arg);
      })
    );
  };
};

export default overArgs;