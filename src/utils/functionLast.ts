import type { Comparator } from "../types/Comparator.d.ts";
import type { Iteratee } from "../types/Iteratee.d.ts";
import type { Predicate } from "../types/Predicate.d.ts";

import bifurcateBy from "../array/bifurcateBy.ts";

type Operator<T> = Comparator<T> | Iteratee<T> | Predicate<T>;
type AppliedArrayOperator<T> = (
  func: Operator<T>,
  ...args: Array<Array<T>>
) => any;

export const functionLast = <T>(
  fn: any,
  ...args: Array<any[] | Operator<T>>
): any => {
  const [arrays, applicators] = bifurcateBy(args, Array.isArray) as [
    T[][],
    Operator<T>[]
  ];
  return fn(applicators[0], ...arrays);
};

export default functionLast; 