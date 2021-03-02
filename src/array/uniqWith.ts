import type { Comparator } from "../types/Comparator.d.ts";
import unionWith from "./unionWith.ts";

export const uniqBy = <T>(comparator: Comparator<T>) => unionWith(comparator);

export default uniqBy;
