## dropWhileRight

#### import

```typescript
import dropWhileRight from "https://deno.land/x/denodash@0.1.3/src/array/dropWhileRight.ts";
```

#### signature

```typescript
dropWhileRight = <T>(
      arr: T[],
      predicate: Predicate<T>,
    ): T[]
```

Takes an array (arr) and a Predicate (predicate) which will return boolean. It
iterates over the array starting from the last element in the array, towards the
first element, and will drop (or more accurately, not copy) all elements until
it reaches an element where predicate(element) returns false. It returns a new
array.

#### Source:

```typescript
import { Predicate } from "../types/Predicate.d.ts";

export const dropWhileRight = <T>(
  arr: T[],
  predicate: Predicate<T>,
): T[] => {
  const l = arr.length;
  let i = l - 1;
  while (predicate(arr[i]) && i >= 0) {
    i -= 1;
  }
  return arr.slice(0, i + 1);
};

export default dropWhileRight;
```

#### Test Examples:

```typescript
Rhum.testSuite("dropWhileRight()", () => {
  Rhum.testCase(
    "should drop elements from the end until it finds the first element that doesn't match",
    () => {
      const testArr = [1, 2, 3, 4, 3, 2, 1];
      Rhum.asserts.assertEquals(
        dropWhileRight(testArr, (x) => x < 3),
        [1, 2, 3, 4, 3],
      );
    },
  );
});
```
