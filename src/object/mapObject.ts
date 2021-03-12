import type { ObjectKey } from "../types/ObjectKey.d.ts";
import type { Transformer } from "../types/Transformer.d.ts";

export const mapObject = <T, U>(
  obj: Record<ObjectKey, T>,
  fn: Transformer<T, U>
) =>
  Object.entries(obj).reduce(
    (pv: Record<ObjectKey, U>, [k, v]: [ObjectKey, T]) => ({
      ...pv,
      [k]: fn(v),
    }),
    {}
  );

export default mapObject;
