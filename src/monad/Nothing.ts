import type { MonadType } from "./Monad.ts";

export interface NothingType extends MonadType<any> {
  map: (fn: (v: T) => T) => NothingType;
  tap: (fn: (v: T) => void) => NothingType;
  chain: (fn: (v: T) => T) => NothingType;
  value: () => never;
  inspect: () => `Nothing()`;
  ap: (anotherMonad: MonadType<any>) => MonadType<any>;
  isNothing: true;
}

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
