
## lastIndexOf

#### import
```typescript
import lastIndexOf from "https://deno.land/x/denodash@0.1.2/src/array/lastIndexOf.ts"
```

#### signature
```typescript
lastIndexOf = <T>(arr: T[], target: T): number
```

Finds the last index of array (arr) that is the target (target) and returns the index

#### Source:

```typescript
import findLastIndex from "./findLastIndex.ts";

export const lastIndexOf = <T>(arr: T[], target: T): number =>
  findLastIndex(arr, (elem: T): boolean => elem === target);

export default lastIndexOf;

```

#### Test Examples: 

```typescript
Rhum.testSuite("lastIndexOf()", () => {
  Rhum.testCase("gets the last index of a value in an array ", () => {
    const testArr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    Rhum.asserts.assertEquals(lastIndexOf(testArr, 3), 6);
  });
});
```

  