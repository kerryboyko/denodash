import type { Comparator } from "../types/Comparator.d.ts";
import unionWith from "./unionWith.ts";

export const uniqBy = <T>(comparator: Comparator<T>, ...args: T[][]) =>
  unionWith<T>(comparator, ...args);

export default uniqBy;
