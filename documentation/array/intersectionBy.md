
## intersectionBy

#### import
```typescript
import intersectionBy from "https://deno.land/x/denodash@0.1.1/src/array/intersectionBy.ts"
```

#### signature
```typescript
intersectionBy = <T>(fn: Iteratee<T, any>, ...arrays: T[][]): T[]
```

Takes any number of arrays and returns every element in the first array where iteratee(elementOfFirst) has the same value as iteratee(oneOfTheElementsOfTheOtherArray/s)

#### Source:

```typescript
import type { Iteratee } from "../types/Iteratee.d.ts";

const intersectionBy = <T>(fn: Iteratee<T, any>, ...arrays: T[][]): T[] => {
  const baseArray = arrays[0];
  const matchingArrays = arrays.slice(1);
  const matches: T[] = [];
  for (const elem of baseArray) {
    const converted = fn(elem);
    if (
      matchingArrays.every((matchingArray) =>
        matchingArray.map(fn).includes(converted)
      )
    ) {
      matches.push(elem);
    }
  }
  return matches;
};

export default intersectionBy;

```

#### Test Examples: 

```typescript
Rhum.testSuite("intersectionBy()", () => {
  Rhum.testCase(
    "Creates an array of unique values that are included in all given arrays given an iterator",
    () => {
      Rhum.asserts.assertEquals(
        intersectionBy(Math.floor, [2.1, 1.2], [2.3, 3.4]),
        [2.1],
      );
      Rhum.asserts.assertEquals(
        intersectionBy(
          (obj: any) => obj["x"],
          [{ x: 1, y: 7 }],
          [
            { x: 2, y: 7 },
            { x: 1, y: 35 },
          ],
        ),
        [{ x: 1, y: 7 }],
      );
    },
  );
});
```

  