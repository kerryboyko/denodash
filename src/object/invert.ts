const stringifyKey = (k: any, e: string): string | never => {
  if (typeof k === "string") {
    return k;
  }
  if (typeof k.toString === "function") {
    return k.toString();
  }
  try {
    return JSON.stringify(k);
  } catch (err) {
    throw new TypeError(`${e}:${err}`);
  }
};

export const invert = (obj: Record<string, any>) =>
  Object.entries(obj).reduce(
    (pv: Record<string, string>, [k, v]: [string, any]) => ({
      ...pv,
      [
        stringifyKey(
          v,
          `Value of property ${k} is not serializable to string`,
        )
      ]: k,
    }),
    {},
  );

export default invert;
