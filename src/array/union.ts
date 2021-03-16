import unionBy from "./unionBy.ts";
import identity from "../utils/identity.ts";

export const union = <T>(...arrays: T[][]): T[] =>
  unionBy<T>(identity, ...arrays);

export default union;
