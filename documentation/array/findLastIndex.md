
## findLastIndex

#### import
```typescript
import findLastIndex from "https://deno.land/x/denodash@0.1.1/src/array/findLastIndex.ts"
```

#### signature
```typescript
findLastIndex = <T>(
      arr: T[],
      predicate: Predicate<T>,
    ): number
```

Takes an array (arr) and a Predicate (predicate) and finds the last index in the array where predicate(arr[index]) returns true

#### Source:

```typescript
import { Predicate } from "../types/Predicate.d.ts";

export const findLastIndex = <T>(
  arr: T[],
  predicate: Predicate<T>,
): number => {
  const l = arr.length;
  let i = l - 1;
  while (!predicate(arr[i]) && i >= 0) {
    i -= 1;
  }
  return i;
};

export default findLastIndex;

```

#### Test Examples: 

```typescript
Rhum.testSuite("findLastIndex()", () => {
  Rhum.testCase("should find the last index that matches", () => {
    const testArr = [1, 2, 3, 4, 3, 2, 1];
    Rhum.asserts.assertEquals(
      findLastIndex(testArr, (x: number) => x === 3),
      4,
    );
  });
});
```

  