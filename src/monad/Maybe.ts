import type {MonadType, MaybeType} from '../types/Monads.d.ts'

import Nothing from "./Nothing.ts";

const Maybe = <T>(val: T): MaybeType<T> => {
  let _val = val;
  const Something: MonadType<T> = {
    map: (fn) => Maybe(fn(_val)),
    tap: (fn) => {
      fn(_val);
      return Maybe(_val);
    },
    chain: (fn) => fn(_val),
    ap: (anotherMonad) => anotherMonad.map(() => _val),
    value: () => _val,
    isNothing: false
  };
  if (typeof _val === "undefined" || _val === null) {
    return Nothing();
  }
  return Something;
};

export default Maybe;