## differenceBy

#### import

```typescript
import differenceBy from "https://deno.land/x/denodash@0.1.3/src/array/differenceBy.ts";
```

#### signature

```typescript
differenceBy = <T>(iteratee: Iteratee<T, any>, a: T[], b: T[]): T[]
```

Takes two arrays (a, b) and an iteratee. It returns an array of elements in a
where the return of iteratee(a) does not equal any return of the map of b over
iteratee. In other words, after running the function on both, remove any
elements where iteratee(a) matches any iteratee(b)

#### Source:

```typescript
import type { Iteratee } from "../types/Iteratee.d.ts";

export const differenceBy = <T>(
  iteratee: Iteratee<T, any>,
  a: T[],
  b: T[],
): T[] => {
  const diffs: T[] = [];
  const bMap = b.map(iteratee);
  for (const val of a) {
    if (!bMap.includes(iteratee(val))) {
      diffs.push(val);
    }
  }
  return diffs;
};

export default differenceBy;
```

#### Test Examples:

```typescript
Rhum.testSuite("differenceBy()", () => {
  Rhum.testCase("accepts an iteratee", () => {
    const a = [0.3, 1.7, 6.2, 3.2];
    const b = [0.5, 2.1, 6.8];
    Rhum.asserts.assertEquals(differenceBy(Math.floor, a, b), [1.7, 3.2]);
  });
});
```
