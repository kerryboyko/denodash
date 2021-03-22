import type { MaybeType, MonadType } from "../types/Monads.d.ts";
import Monad from "./Monad.ts";
import Nothing from "./Nothing.ts";

const Maybe = (val: any): MaybeType<any> => {
  if (typeof val === "undefined" || val === null) {
    return Nothing();
  }

  return Monad(val)
    .define("isNothing", false)
    .patch("inspect", () => `Something(${val}) as Maybe(${val})`)
    .patch("map", (fn) => Maybe(fn(val)))
    .patch("tap", (fn) => {
      fn(val);
      return Maybe(val);
    });
};

export default Maybe;
