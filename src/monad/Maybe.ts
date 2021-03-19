import type { MonadType } from "./Monad.ts";
import Nothing from "./Nothing.ts";
import type { NothingType } from "./Nothing.ts";

export type MaybeType<T> = MonadType<T> | NothingType

const Maybe = <T>(val: T): MonadType<T> | NothingType => {
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