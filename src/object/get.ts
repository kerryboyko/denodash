import type { ValueOrArray } from "../types/ValueOrArray.d.ts";

const simpleGet = (
  obj: Record<string | number, any> | undefined,
  path: Array<string | number>,
): any => {
  let cursor = obj;

  for (let i = 0, l = path.length; i < l; i++) {
    if (cursor === undefined) {
      return undefined;
    }
    cursor = cursor[path[i]];
  }
  return cursor;
};

const parsePath = (
  path: ValueOrArray<string | number> | string,
): Array<string | number> => {
  if (typeof path === "string") {
    path = path.split(".") as ValueOrArray<string | number>;
  }
  if (typeof path === "number") {
    path = [path];
  }
  let output: Array<string | number> = [];
  for (let i = 0, l = path.length; i < l; i++) {
    if (
      typeof path[i] === "number" ||
      (typeof path[i] === "string" && (path[i] as string).indexOf(".") === -1)
    ) {
      output = output.concat(path[i] as string | number);
    } else {
      output = output.concat(parsePath(path[i]));
    }
  }
  return output;
};

export const get = (
  obj: Record<string | number, any>,
  path: string | Array<string | number>,
  retValueIfUndef?: any,
): any => {
  const result: any = simpleGet(obj, parsePath(path));
  if (result === undefined) {
    return retValueIfUndef;
  }
  return result;
};

export default get;
