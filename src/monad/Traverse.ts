import Maybe from "./Maybe.ts";
import { ObjectKey } from "../types/ObjectKey.d.ts";
import type { TraverseType } from "../types/Monads.d.ts";

const Traverse = (val: any, ...backupValues: any): TraverseType<any> => {
  const traverser: TraverseType<any> = Maybe(val);
  if (traverser.hasOwnProperty("isNothing") && traverser.isNothing === true) {
    return Traverse(backupValues[0], ...backupValues.slice(1));
  }
  traverser.patch(
    "traverse",
    (prop: ObjectKey): TraverseType<any> => {
      return traverser.map((v: any) => v[prop]);
    },
  );
  return traverser;
};

export default Traverse;
