## flattenDepth

#### import

```typescript
import flattenDepth from "https://deno.land/x/denodash@0.1.3/src/array/flattenDepth.ts";
```

#### signature

```typescript
flattenDepth = (arr: any[], level: number = 1): any[]
```

Takes an array (arr) and flattens it by (level) levels. There is a third
parameter, currLevel, which is only used internally for recursion.

#### Source:

```typescript
export const flattenDepth = (arr: any[], level = 1, currLevel = 1): any[] => {
  const clone = arr.slice();
  if (level === 0) {
    return clone;
  }
  let output: any = [];
  while (clone.length) {
    let elem = clone.shift();
    output = output.concat(
      Array.isArray(elem) && currLevel < level
        ? flattenDepth(elem, level, currLevel + 1)
        : elem,
    );
  }
  return output;
};

export default flattenDepth;
```

#### Test Examples:

```typescript
Rhum.testSuite("flattenDepth()", () => {
  Rhum.testCase("should flatten an index n levels", () => {
    const testArr = [1, [2, [3, [4]], 5]];
    Rhum.asserts.assertEquals(flattenDepth(testArr, 1), [1, 2, [3, [4]], 5]);
    Rhum.asserts.assertEquals(flattenDepth(testArr, 2), [1, 2, 3, [4], 5]);
    Rhum.asserts.assertEquals(flattenDepth(testArr, 5), [1, 2, 3, 4, 5]);
  });
});
```
