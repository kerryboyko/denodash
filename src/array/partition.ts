import partitionBy from "./partitionBy.ts";

export const partition = <T>(arr: T[], filterArray: boolean[]) =>
  partitionBy((_unused: T, i: number) => filterArray[i])(arr);

export default partition;
