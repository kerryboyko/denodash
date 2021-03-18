
## get

#### import
```typescript
import get from "https://deno.land/x/denodash@0.1.2/src/object/get.ts"
```

#### signature
```typescript
get = (
      obj: Record<string | number, any>,
      path: string | Array<string | number>,
      retValueIfUndef?: any,
    ): any
```

Gets the value of an object at the property path, which may be expressed as a string or an array of string | number. If the property path does not exist, returns the "retValueIfUndef" value provided.

#### Source:

```typescript
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

```

#### Test Examples: 

```typescript
  Rhum.testSuite("get()", () => {
    const testObj = {
      a: {
        b: 2,
        c: {
          d: false,
          e: ["foo", "bar", { baz: "quux" }],
        },
      },
    };
    Rhum.testCase("should get objects by a path", () => {
      Rhum.asserts.assertStrictEquals(
        get(testObj, ["a", "c", "e", 2, "baz"], "nope"),
        "quux",
      );
    });
    Rhum.testCase("should return whole objects", () => {
      Rhum.asserts.assertEquals(get(testObj, ["a", "c"], "nope"), {
        d: false,
        e: ["foo", "bar", { baz: "quux" }],
      });
    });
    Rhum.testCase("should a default if path does not exist", () => {
      Rhum.asserts.assertStrictEquals(
        get(testObj, ["a", "q", "c"], "nope"),
        "nope",
      );
      Rhum.asserts.assertStrictEquals(
        get(testObj, ["a", "b", "c"], "nope"),
        "nope",
      );
    });
    Rhum.testCase("should work with strings", () => {
      Rhum.asserts.assertEquals(get(testObj, "a.c.e", "nope"), [
        "foo",
        "bar",
        { baz: "quux" },
      ]);
    });
    Rhum.testCase("should work with a mix of arrays and strings", () => {
      Rhum.asserts.assertStrictEquals(
        get(testObj, ["a.c", "e", 2, "baz"], "nope"),
        "quux",
      );
    });
  });
```

  