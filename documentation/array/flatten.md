## flatten

#### import

```typescript
import flatten from "https://deno.land/x/denodash@0.1.3/src/array/flatten.ts";
```

#### signature

```typescript
flatten = (arr: any[]): any[]
```

Takes an array (arr) and flattens it one level

#### Source:

```typescript
import flattenDepth from "./flattenDepth.ts";

export const flatten = (arr: any[]): any[] => flattenDepth(arr, 1);

export default flatten;
```

#### Test Examples:

```typescript
Rhum.testSuite("flatten()", () => {
  Rhum.testCase("should flatten an index one level", () => {
    const testArr = [1, [2, [3, [4]], 5]];
    Rhum.asserts.assertEquals(flatten(testArr), [1, 2, [3, [4]], 5]);
  });
});
```
