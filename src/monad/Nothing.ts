import type { NothingType } from "../types/Monads.d.ts";
import Monad from "./Monad.ts";

export const Nothing = (): NothingType => {
  const nothing = Monad(undefined)
    .define("inspect", () => `Nothing()`)
    .define("isNothing", () => true)
    .patch("map", () => Nothing())
    .patch("tap", () => Nothing())
    .patch("chain", () => {
      throw new Error(`Cannot chain Nothing()`);
    });
  Object.defineProperty(nothing, "value", {
    value: undefined,
    get: (): never => {
      throw new Error(`Cannot get value of Nothing()`);
    },
  });

  return nothing as NothingType;
};

export default Nothing;
