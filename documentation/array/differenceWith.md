
## differenceWith

#### import
```typescript
import differenceWith from "https://deno.land/x/denodash@0.1.1/src/array/differenceWith.ts"
```

#### signature
```typescript
differenceWith = <T>(
        comparator: Comparator<T>,
        a: T[],
        b: T[],
      )
```

Takes two arrays (a, b) and a comparator (which will return a boolean). It returns an array of elements in a where no element in b returns true for comparator(elemA, elemB)

#### Source:

```typescript
import type { Comparator } from "../types/Comparator.d.ts";

export const differenceWith = <T>(
  comparator: Comparator<T>,
  a: T[],
  b: T[],
): T[] => {
  const diffs: T[] = [];
  for (const val of a) {
    if (!b.some((bVal) => comparator(val, bVal))) {
      diffs.push(val);
    }
  }
  return diffs;
};

export default differenceWith;

```

#### Test Examples: 

```typescript
Rhum.testSuite("differenceWith()", () => {
  Rhum.testCase("should work with a comparator", () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 1, y: 4 },
      { x: 2, y: 1 },
    ];
    const actual1 = differenceWith<any & { x: any }>(
      (obj1, obj2) => obj1.x === obj2.x,
      objects,
      [{ x: 1, y: 2 }],
    );
    const actual2 = differenceWith<any & { y: any }>(
      (obj1, obj2) => obj1.y === obj2.y,
      objects,
      [{ x: 3, y: 2 }],
    );

    Rhum.asserts.assertEquals(actual1, [{ x: 2, y: 1 }]);
    Rhum.asserts.assertEquals(actual2, [
      { x: 1, y: 4 },
      { x: 2, y: 1 },
    ]);
  });
});
```

  