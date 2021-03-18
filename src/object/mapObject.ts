import type { ObjectKey } from "../types/ObjectKey.d.ts";
import type { Iteratee } from "../types/Iteratee.d.ts";

export const mapObject = <T, U>(
  obj: Record<ObjectKey, T>,
  iteratee: Iteratee<T, U>,
): Record<ObjectKey, U> =>
  Object.entries(obj).reduce(
    (pv: Record<ObjectKey, U>, [k, v]: [ObjectKey, T]) => ({
      ...pv,
      [k]: iteratee(v),
    }),
    {},
  );

export default mapObject;
