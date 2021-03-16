## xor

#### import

```typescript
import xor from "https://deno.land/x/denodash@0.1.1/src/array/xor.ts";
```

#### signature

```typescript
xor = (...arrays: any[][]): any[]
```

Creates an array of elements where the element appears in one and only one of
the arrays

#### Source:

```typescript
import intersection from "./intersection.ts";

export const xor = (...arrays: any[][]): any[] => {
  const intersections = new Set(intersection<any>(...arrays));
  return ([] as any[])
    .concat(...arrays)
    .filter((elem) => !intersections.has(elem));
};

export default xor;
```

#### Test Examples:

```typescript
Rhum.testSuite("xor()", () => {
  Rhum.testCase("should produce the symmetric difference", () => {
    Rhum.asserts.assertEquals(xor([2, 1], [2, 3]), [1, 3]);
  });
});
```
