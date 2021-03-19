import Maybe from "./Maybe.ts";
import type { MaybeType } from "./Maybe.ts";
import { ObjectKey } from "../../documentation/types/ObjectKey.d.ts";

export type TraverseType<T> = MaybeType<T> & {
  traverse?: (prop: ObjectKey) => TraverseType<any>;
};

const Traverse = (val: any, ...backupValues: any): TraverseType<any> => {
  const monadVal = Maybe(val);
  if (monadVal.hasOwnProperty('isNothing') && monadVal.isNothing === true) {
    return Traverse(backupValues[0], ...backupValues.slice(1));
  }
  const traverse = (prop: string | number | symbol): TraverseType<any> => {
    return monadVal.map((v: any) => v[prop]);
  };

};
