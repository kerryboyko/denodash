import Maybe from "./Maybe.ts";
import type { MaybeType } from "./Maybe.ts";
import { ObjectKey } from "../types/ObjectKey.d.ts";

export type TraverseType<T> = MaybeType<T> & {
  traverse?: (prop: ObjectKey) => TraverseType<any>;
};

export const Traverse = (val: any, ...backupValues: any): TraverseType<any> => {
  const _val: TraverseType<any> = Maybe(val);
  _val.traverse = (prop: ObjectKey): TraverseType<any> => {
    return _val.map((v: any) => v[prop]);
  };
  if (_val.hasOwnProperty('isNothing') && _val.isNothing === true) {
    return Traverse(backupValues[0], ...backupValues.slice(1));
  }
  return _val
};

export default Traverse;