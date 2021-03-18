import type { MonadType } from "./Monad.ts";

export interface NothingType extends MonadType<any> {
  map: (fn: (v: T) => T) => NothingType;
  tap: (fn: (v: T) => void) => NothingType;
  chain: (fn: (v: T) => T) => NothingType;
  value: () => never;
  isNothing: () => true;
  inspect: () => `Nothing()`;
  ap: (anotherMonad: MonadType<any>) => MonadType<any>;
}

export const Nothing = (): NothingType => ({
  map: (fn) => Nothing(),
  tap: (fn) => Nothing(),
  isNothing: () => true,
  inspect: () => `Nothing()`,
  chain: (fn) => fn(Nothing()),
  ap: (anotherMonad) => anotherMonad,
  value: () => {
    throw new Error(`Cannot call value() of Nothing()`);
  },
});

export default Nothing;
