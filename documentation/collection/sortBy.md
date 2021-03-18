
## sortBy

#### import
```typescript
import sortBy from "https://deno.land/x/denodash@0.1.2/src/collection/sortBy.ts"
```

#### signature
```typescript
sortBy = <T>(
      array: T[],
      ...comparators: SortComparator<T>[]
    ): T[]
```

Returns a copy of the array provided, sorted by the criteria provided (comparators). Comparators are prioritized from first to last.

#### Source:

```typescript
import type { SortComparator } from "../types/SortComparator.d.ts";
import comparatorChain from "../utils/comparatorChain.ts";

export const sortBy = <T>(
  array: T[],
  ...comparators: SortComparator<T>[]
): T[] => {
  const chain = comparatorChain<T>(...comparators);
  return array.slice().sort((a, b) => chain(a, b));
};
export default sortBy;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("sortBy()", () => {
    Rhum.testCase(
      "sorts the order of the iteratees based on the criteria provided",
      () => {
        type TestType = { user: string; age: number };
        const testArray: TestType[] = [
          { user: "fred", age: 48 },
          { user: "barney", age: 34 },
          { user: "fred", age: 40 },
          { user: "barney", age: 36 },
        ];
        Rhum.asserts.assertEquals(
          sortBy(
            testArray,
            (a: TestType, b: TestType): number => a.user.localeCompare(b.user),
            (a: TestType, b: TestType): number => a.age - b.age,
          ),
          [
            { user: "barney", age: 34 },
            { user: "barney", age: 36 },
            { user: "fred", age: 40 },
            { user: "fred", age: 48 },
          ],
        );
        Rhum.asserts.assertEquals(
          sortBy(
            testArray,
            (a: TestType, b: TestType): number => a.user.localeCompare(b.user),
            (a: TestType, b: TestType): number => b.age - a.age,
          ),
          [
            { user: "barney", age: 36 },
            { user: "barney", age: 34 },
            { user: "fred", age: 48 },
            { user: "fred", age: 40 },
          ],
        );
      },
    );
  });
```

  