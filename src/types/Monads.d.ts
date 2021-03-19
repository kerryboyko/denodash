import type { ObjectKey } from "./ObjectKey.d.ts";

export type MonadType<T> = {
  map: (fn: (v: T) => T) => MonadType<any>;
  tap: (fn: (v: T) => void) => MonadType<any>;
  chain: (fn: (v: T) => T) => T;
  ap: (anotherMonad: MonadType<T>) => MonadType<T>;
  value: () => T;
  isNothing?: boolean;
};

export interface NothingType extends MonadType<any> {
  map: (fn: (v: T) => T) => NothingType;
  tap: (fn: (v: T) => void) => NothingType;
  chain: (fn: (v: T) => T) => NothingType;
  value: () => never;
  inspect: () => `Nothing()`;
  ap: (anotherMonad: MonadType<any>) => MonadType<any>;
  isNothing: true;
}

export type MaybeType<T> = MonadType<T> | NothingType;

export type TraverseType<T> = MaybeType<T> & {
  traverse?: (prop: ObjectKey) => TraverseType<any>;
};
