import identity from '../utils/identity.ts';
import countBy from "./countBy.ts";

export const count = <T>(
  arr: T[]
): Record<string, number> => countBy(identity)(arr);

export default count;