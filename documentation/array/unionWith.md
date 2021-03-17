
## unionWith

#### import
```typescript
import unionWith from "https://deno.land/x/denodash@0.1.1/src/array/unionWith.ts"
```

#### signature
```typescript
unionWith = <T>(comparator: Comparator<T>, ...arrays: T[][]): T[]
```

Creates an array of values where every value does equals false when passed in a comparator with every other value

#### Source:

```typescript
import type { Comparator } from "../types/Comparator.d.ts";

const unionWith = <T>(comparator: Comparator<T>, ...arrays: T[][]): T[] => {
  const matchingArrays = ([] as T[]).concat(...arrays);
  const matches: T[] = [];
  for (const elem of matchingArrays) {
    if (!matches.some((previousMatch) => comparator(elem, previousMatch))) {
      matches.push(elem);
    }
  }
  return matches;
};

export default unionWith;

```

#### Test Examples: 

```typescript
Rhum.testSuite("unionWith()", () => {
  Rhum.testCase(
    "Creates an array of unique values, in order, from all given arrays, given a comparator",
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
        unionWith(
          (a, b) => JSON.stringify(a) === JSON.stringify(b),
          objects,
          others,
        ),
        [
          { x: 1, y: 2 },
          { x: 2, y: 1 },
          { x: 1, y: 1 },
        ],
      );
    },
  );
});
```

  