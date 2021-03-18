## flatMapDepth

#### import

```typescript
import flatMapDepth from "https://deno.land/x/denodash@0.1.1/src/collection/flatMapDepth.ts";
```

#### signature

```typescript
flatMapDepth = <T, U>(
      iteratee: Iteratee<T, U>,
      arr: T[],
      depth: number = Number.MAX_SAFE_INTEGER,
    ): U[]
```

Runs each element through a iteratee, and returns a flatMap of the results after
being run through iteratee. T is the parameter type of iteratee, up to a number
of levels specified.

#### Source:

```typescript
import flattenDepth from "../array/flattenDepth.ts";
import { Iteratee } from "../types/Iteratee.d.ts";

// Array.prototype.flatMap does not have Internet Explorer 11 support.
export const flatMapDepth = <T, U>(
  iteratee: Iteratee<T, U>,
  arr: T[],
  depth: number = Number.MAX_SAFE_INTEGER,
): U[] => flattenDepth(arr.map(iteratee), depth);

export default flatMapDepth;
```

#### Test Examples:

```typescript
Rhum.testSuite("flatMapDepth()", () => {
  Rhum.testCase(
    "should created a flattened flatmap only to a certain level",
    () => {
      Rhum.asserts.assertEquals(
        flatMapDepth((n: any) => [[[n, n]]], [1, 2], 2),
        [
          [1, 1],
          [2, 2],
        ],
      );
    },
  );
});
```
