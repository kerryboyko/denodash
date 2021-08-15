## dropWhile

#### import

```typescript
import dropWhile from "https://deno.land/x/denodash@0.1.3/src/array/dropWhile.ts";
```

#### signature

```typescript
dropWhile = <T>(
      arr: T[],
      predicate: Predicate<T>,
    ): T[]
```

Takes an array (arr) and a Predicate (predicate) which will return boolean. It
iterates over the array and will drop (or more accurately, not copy) all
elements until it reaches an element where predicate(element) returns false. It
returns a new array.

#### Source:

```typescript
import { Predicate } from "../types/Predicate.d.ts";

export const dropWhile = <T>(
  arr: T[],
  predicate: Predicate<T>,
): T[] => {
  const l = arr.length;
  let cursor = 0;
  while (cursor < l && predicate(arr[cursor])) {
    cursor += 1;
  }
  return arr.slice(cursor);
};

export default dropWhile;
```

#### Test Examples:

```typescript
Rhum.testSuite("dropWhile()", () => {
  Rhum.testCase(
    "should drop elements until it finds the first element that doesn't match",
    () => {
      const testArr = [1, 2, 3, 4, 3, 2, 1];
      Rhum.asserts.assertEquals(
        dropWhile(testArr, (x) => x < 3),
        [3, 4, 3, 2, 1],
      );
    },
  );
});
```
