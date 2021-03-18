
## intersectionWith

#### import
```typescript
import intersectionWith from "https://deno.land/x/denodash@0.1.2/src/array/intersectionWith.ts"
```

#### signature
```typescript
intersectionWith = <T>(
      comparator: Comparator<T>,
      ...arrays: T[][]
    ): T[]
```

Takes any number of arrays and returns every element in the first array where some element of each of the other arrays returns true when placed in the comparator with the element from the first array

#### Source:

```typescript
import type { Comparator } from "../types/Comparator.d.ts";

const intersectionWith = <T>(
  comparator: Comparator<T>,
  ...arrays: T[][]
): T[] => {
  const baseArray = arrays[0];
  const matchingArrays = arrays.slice(1);
  const matches: T[] = [];
  for (const baseElem of baseArray) {
    if (
      matchingArrays.every((matchingArray) =>
        matchingArray.some((matchElem) => comparator(baseElem, matchElem))
      )
    ) {
      matches.push(baseElem);
    }
  }
  return matches;
};

export default intersectionWith;

```

#### Test Examples: 

```typescript
Rhum.testSuite("intersectionWith()", () => {
  Rhum.testCase(
    "Creates an array of unique values that are included in all given arrays given an comparator",
    () => {
      const objects = [
        { x: 1, y: 2 },
        { x: 2, y: 1 },
      ];
      const others = [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ];
      Rhum.asserts.assertEquals(
        intersectionWith(
          (a, b) => JSON.stringify(a) === JSON.stringify(b),
          objects,
          others,
        ),
        [{ x: 1, y: 2 }],
      );
    },
  );
});
```

  