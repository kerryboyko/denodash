## pick

#### import

```typescript
import pick from "https://deno.land/x/denodash@0.1.3/src/object/pick.ts";
```

#### signature

```typescript
pick = (
      obj: Record<string | number, any>,
      props: Array<string | number>,
    ): Record<string | number, any>
```

Returns a copy of the record (obj) provided, with ONLY the keys specified in
props.

#### Source:

```typescript
export const pick = (
  obj: Record<string | number, any>,
  props: Array<string | number>,
): Record<string | number, any> => {
  const newObj: Record<string | number, any> = {};
  for (let prop of props) {
    if (obj[prop] !== undefined) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
};

export default pick;
```

#### Test Examples:

```typescript
Rhum.testSuite("pick()", () => {
  const testObj = {
    f: "f",
    g: "g",
    h: "h",
    i: "i",
    j: 0,
    k: false,
  };
  Rhum.testCase("picks values from an object", () => {
    Rhum.asserts.assertEquals(pick(testObj, ["f", "h", "i"]), {
      f: "f",
      h: "h",
      i: "i",
    });
  });
  Rhum.testCase("ignores non-existant values", () => {
    Rhum.asserts.assertEquals(pick(testObj, ["f", "h", "i", "aluminium"]), {
      f: "f",
      h: "h",
      i: "i",
    });
  });
  Rhum.testCase("correctly gets falsey values", () => {
    Rhum.asserts.assertEquals(pick(testObj, ["f", "j", "k", "aluminium"]), {
      f: "f",
      j: 0,
      k: false,
    });
  });
});
```
