import type { NothingType } from "../types/Monads.d.ts";

export const Nothing = (): NothingType => ({
  map: (_fn) => Nothing(),
  tap: (_fn) => Nothing(),
  inspect: () => `Nothing()`,
  chain: (fn) => fn(Nothing()),
  ap: (anotherMonad) => anotherMonad,
  value: () => {
    throw new Error(`Cannot call value() of Nothing()`);
  },
  isNothing: true,
});

export default Nothing;
