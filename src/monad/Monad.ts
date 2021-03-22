import type { MonadType } from "../types/Monads.d.ts";

export const Monad = <T>(val: T): MonadType<T> => {
  return {
    map: (fn: (v: T) => T): MonadType<T> => Monad(fn(val)),
    tap: (fn: (v: T) => T): MonadType<T> => {
      fn(val);
      return Monad(val);
    },
    chain: (fn: (v: T) => T): T => fn(val),
    ap: <U>(anotherMonad: MonadType<U>): MonadType<U> =>
      anotherMonad.map(() => (val as unknown) as U),
    patch: (methodName: string, fn: (v: T) => MonadType<T>): MonadType<T> => {
      const patched = { ...Monad<T>(val), [methodName]: fn };
      return patched;
    },
    define: (propertyName: string, propertyValue: any): MonadType<T> => {
      const defined = { ...Monad<T>(val), [propertyName]: propertyValue };
      return defined;
    },
    inspect: () => `Monad(${val})`,
    value: (): T => val,
  };
};

export const Identity = Monad;

export default Monad;
