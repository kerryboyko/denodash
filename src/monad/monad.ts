export type MonadType<T> = {
  map: (fn: (v: T) => T) => MonadType<any>;
  tap: (fn: (v: T) => void) => MonadType<any>;
  chain: (fn: (v: T) => T) => T;
  ap: (anotherMonad: MonadType<T>) => MonadType<T>;
  value: () => T;
};

export const Monad = <T>(val: T): MonadType<T> => {
  let _val: T = val;
  return {
    map: (fn) => Monad(fn(_val)),
    tap: (fn) => {
      fn(_val);
      return Monad(_val);
    },
    chain: (fn) => fn(_val),
    ap: (anotherMonad) => anotherMonad.map(() => _val),
    value: () => _val,
  };
};

export const Identity = Monad;

export default Monad;
