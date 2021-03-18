## omit

#### import

```typescript
import omit from "https://deno.land/x/denodash@0.1.1/src/object/omit.ts";
```

#### signature

```typescript
omit = (
      obj: Record<string | number, any>,
      props: Array<string | number>,
    ): Record<string | number, any>
```

Returns a copy of the record (obj) provided, without the keys specified in
props.

#### Source:

```typescript
import pick from "./pick.ts";

export const omit = (
  obj: Record<string | number, any>,
  props: Array<string | number>,
): Record<string | number, any> => {
  const getProps = Object.keys(obj).filter(
    (p: string | number) => !props.includes(p),
  );
  return pick(obj, getProps);
};

export default omit;
```

#### Test Examples:

```typescript
Rhum.testSuite("omit()", () => {
  const testObj = {
    f: "f",
    g: "g",
    h: "h",
    i: "i",
    j: 0,
    k: false,
  };
  Rhum.testCase("picks values from an object", () => {
    Rhum.asserts.assertEquals(omit(testObj, ["f", "j", "k"]), {
      g: "g",
      h: "h",
      i: "i",
    });
  });
  Rhum.testCase("ignores non-existant values", () => {
    Rhum.asserts.assertEquals(omit(testObj, ["f", "j", "k", "aluminium"]), {
      g: "g",
      h: "h",
      i: "i",
    });
  });
  Rhum.testCase("correctly gets falsey values", () => {
    Rhum.asserts.assertEquals(omit(testObj, ["f", "i"]), {
      g: "g",
      h: "h",
      j: 0,
      k: false,
    });
  });
});
```
