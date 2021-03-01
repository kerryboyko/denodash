import bifurcateBy from "./bifurcateBy.ts";

export const bifurcate = <T>(arr: T[], filterArray: boolean[]) =>
  bifurcateBy(arr, (_unused: T, i: number) => filterArray[i]);

export default bifurcate;
