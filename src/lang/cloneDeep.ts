const cloneDeep = (value: any): any | never => {
  const typeofValue = typeof value;
  // primatives are copied by value.
  if (
    [
      "string",
      "number",
      "boolean",
      "string",
      "bigint",
      "symbol",
      "null",
      "undefined",
      "function",
    ].includes(typeofValue)
  ) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(cloneDeep);
  }
  if (typeofValue === "object") {
    const clone: any = {};
    for (let prop in value) {
      clone[prop] = cloneDeep(value[prop]);
    }
    return clone;
  }
  throw new Error(`You've tried to clone something that can't be cloned`);
};

export default cloneDeep;
