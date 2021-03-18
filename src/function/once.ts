import before from "./before.ts";

export const once = (fn: Function): ((...args: any) => any | void) =>
  before(1, fn);

export default once;
