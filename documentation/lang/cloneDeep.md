## cloneDeep

#### import

```typescript
import cloneDeep from "https://deno.land/x/denodash@0.1.3/src/lang/cloneDeep.ts";
```

#### signature

```typescript
cloneDeep = (value: any): any | never
```

Creates a deep clone of the value passed into it. All primatives are copied by
value, but new objects are created instead of passing these elements by
reference.

#### Source:

```typescript
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
```

#### Test Examples:

```typescript
Rhum.testSuite("cloneDeep()", () => {
  Rhum.testCase("should create a deep clone of an object", () => {
    const testObj = {
      a: {
        b: {
          c: "foo",
        },
      },
      d: {
        e: {
          f: "bar",
        },
      },
    };
    const testClone = cloneDeep(testObj);
    Rhum.asserts.assertStrictEquals(testObj.a.b.c, testClone.a.b.c);
    Rhum.asserts.assertEquals(testObj, testClone);
    Rhum.asserts.assertNotStrictEquals(testObj, testClone);
    Rhum.asserts.assertEquals(testObj.a, testClone.a);
    Rhum.asserts.assertNotStrictEquals(testObj.a, testClone.a);
  });
});
```
