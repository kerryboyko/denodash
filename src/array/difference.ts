import differenceBy from "./differenceBy.ts";
import identity from "../utils/identity.ts";

export const difference = <T>(a: T[], b: T[]) => differenceBy(identity, a, b);

export default difference;
