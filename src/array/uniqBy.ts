import type { Iteratee } from "../types/Iteratee.d.ts";
import unionBy from "./unionBy.ts";

export const uniqBy = <T>(iteratee: Iteratee<T, any>) => unionBy<T>(iteratee);

export default uniqBy;
