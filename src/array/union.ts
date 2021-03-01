import unionBy from "./unionBy.ts";

export const union = <T>(...arrays: T[][]): T[] =>
  unionBy((x: T) => x, ...arrays);
