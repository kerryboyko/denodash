import bifurcateBy from "./bifurcateBy.ts";

export const bifurcate = <T>(arr: T[], filterArray: boolean[]) =>
  bifurcateBy((_unused: T, i: number) => filterArray[i])(arr);

export default bifurcate;
