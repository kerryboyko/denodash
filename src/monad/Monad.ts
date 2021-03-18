export type MonadType<T> = {
  map: (fn: (v: T) => T) => MonadType<any>;
  tap: (fn: (v: T) => void) => MonadType<any>;
  chain: (fn: (v: T) => T) => T;
  ap: (anotherMonad: MonadType<any>) => MonadType<any>;
  value: () => T;
};

export const monad = (val: T): MonadType<T> => {
  let _val: T = val;
  return {
    map: (fn) => monad(fn(_val)),
    tap: (fn) => {
      fn(_val);
      return monad(_val);
    },
    chain: (fn) => fn(_val),
    ap: (anotherMonad) => anotherMonad.map(_val),
    value: () => _val,
  };
};

export default monad;
