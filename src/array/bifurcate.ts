import bifurcateBy from "./bifurcateBy.ts";

export const bifurcate = <T>(arr: T[], boolArray: boolean[]) =>
  bifurcateBy(arr, (_unused: T, i: number) => boolArray[i]);

export default bifurcate;
