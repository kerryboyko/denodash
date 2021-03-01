import intersectionBy from "./intersectionBy.ts";
import identity from "../utils/identity.ts";

export const intersection = <T>(...arrays: T[][]): T[] =>
  intersectionBy(identity, ...arrays);

export default intersection;