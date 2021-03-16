
## unionBy

#### import
```typescript
import unionBy from "https://deno.land/x/denodash@0.1.1/src/array/unionBy.ts"
```

#### signature
```typescript
unionBy = <T>(fn: Iteratee<T, any>, ...arrays: T[][]): T[]
```

Creates an array of values that result in a unique value when passed through fn, in order

#### Source:

```typescript
import type { Iteratee } from "../types/Iteratee.d.ts";

export const unionBy = <T>(fn: Iteratee<T, any>, ...arrays: T[][]): T[] => {
  const matchingArrays = ([] as T[]).concat(...arrays);
  const read = new Set<T>();
  const matches: T[] = [];
  for (const elem of matchingArrays) {
    if (!read.has(fn(elem))) {
      read.add(fn(elem));
      matches.push(elem);
    }
  }
  return matches;
};

export default unionBy;

```

#### Test Examples: 

```typescript
Rhum.testSuite("unionBy()", () => {
  Rhum.testCase(
    "Creates an array of unique values, in order, from all given arrays, given an iteratee",
    () => {
      Rhum.asserts.assertEquals(unionBy(Math.floor, [2.1], [1.2, 2.3]), [
        2.1,
        1.2,
      ]);
      Rhum.asserts.assertEquals(
        unionBy(
          (elem: any & { x: number }) => elem["x"],
          [{ x: 1, y: 7 }],
          [
            { x: 2, y: 9 },
            { x: 1, y: 30 },
            { x: 2, y: 44 },
          ],
        ),
        [
          { x: 1, y: 7 },
          { x: 2, y: 9 },
        ],
      );
    },
  );
});
```

  