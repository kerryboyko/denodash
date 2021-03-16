## flattenDeep

#### import

```typescript
import flattenDeep from "https://deno.land/x/denodash@0.1.1/src/array/flattenDeep.ts";
```

#### signature

```typescript
flattenDeep = (arr: any[]): any[]
```

Takes an array (arr) and flattens it until it is completely flat

#### Source:

```typescript
import flattenDepth from "./flattenDepth.ts";

export const flattenDeep = (arr: any[]) =>
  flattenDepth(arr, Number.MAX_SAFE_INTEGER);

export default flattenDeep;
```

#### Test Examples:

```typescript
Rhum.testSuite("flattenDeep()", () => {
  Rhum.testCase("should flatten an index completely", () => {
    const testArr = [1, [2, [3, [4]], 5]];
    Rhum.asserts.assertEquals(flattenDeep(testArr), [1, 2, 3, 4, 5]);
  });
});
```
