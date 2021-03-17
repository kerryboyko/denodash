
## groupBy

#### import
```typescript
import groupBy from "https://deno.land/x/denodash@0.1.1/src/collection/groupBy.ts"
```

#### signature
```typescript
groupBy = <T>(
      iteratee: Iteratee<T, any>,
      arr: T[],
    ): Record<string, T[]>
```

Groups elements of an array of type T according to a criteria provided (iteratee) as a Record of arrays of type T

#### Source:

```typescript
import type { Iteratee } from "../types/Iteratee.d.ts";

export const groupBy = <T>(
  iteratee: Iteratee<T, any>,
  arr: T[],
): Record<string, T[]> => {
  const output: Record<string, Array<T>> = {};
  for (const elem of arr) {
    const key = iteratee(elem).toString();
    if (output[key] === undefined) {
      output[key] = [];
    }
    output[key].push(elem);
  }
  return output;
};

export default groupBy;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("groupBy()", () => {
    Rhum.testCase(
      "create an object composed of keys generated from the collection run through an iteratee",
      () => {
        Rhum.asserts.assertEquals(groupBy(Math.floor, [6.1, 4.2, 6.3]), {
          "4": [4.2],
          "6": [6.1, 6.3],
        });
        Rhum.asserts.assertEquals(
          groupBy((n: number): string => (n % 2 === 0 ? "even" : "odd"), [
            1,
            2,
            3,
            4,
            5,
          ]),
          {
            even: [2, 4],
            odd: [1, 3, 5],
          },
        );
      },
    );
  });
```

  