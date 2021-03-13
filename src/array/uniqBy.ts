import type { Iteratee } from "../types/Iteratee.d.ts";
import unionBy from "./unionBy.ts";

export const uniqBy = <T>(iteratee: Iteratee<T, any>, ...args: T[][]) => unionBy<T>(iteratee, ...args);

export default uniqBy;
