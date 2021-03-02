import unionBy from "./unionBy.ts";
import identity from "../utils/identity.ts";

export const union = unionBy(identity);

export default union;