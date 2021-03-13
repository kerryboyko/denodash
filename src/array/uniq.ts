import identity from "../utils/identity.ts";
import unionBy from "./unionBy.ts";

export const uniq = <T>(arr: T[]): T[] => unionBy<T>(identity, arr);

export default uniq;
