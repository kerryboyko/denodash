import type { ObjectKey } from "./ObjectKey.d.ts";

export type MonadType<T> = {
  map: (fn: (v: T) => T) => MonadType<any>;
  tap: (fn: (v: T) => T) => MonadType<any>;
  chain: (fn: (v: T) => T) => T;
  ap: <U>(anotherMonad: MonadType<U>) => MonadType<U>;
  value: () => T;
  isNothing?: boolean;
  inspect: () => string;
  patch: (methodName: string, fn: (v: T) => any) => MonadType<T>;
  define: (propertyName: string, propertyValue: any) => MonadType<T>;
  [key: string]: any;
};

export interface NothingType extends MonadType<any> {
  map: () => NothingType;
  tap: () => NothingType;
  chain: () => never;
  value: () => never;
  inspect: () => string;
  isNothing: true;
}

export type MaybeType<T> = MonadType<T> | NothingType;

export type TraverseType<T> = MaybeType<T> & {
  traverse?: (prop: ObjectKey) => TraverseType<any>;
};
