
## comparatorChain

#### import
```typescript
import comparatorChain from "https://deno.land/x/denodash@0.1.1/src/utils/comparatorChain.ts"
```

#### signature
```typescript
comparatorChain = <T>(
      ...comparators: SortComparator<T>[]
    ): SortComparator<T>
```

Creates a single sort comparator out of several sort parameters. The first sort comparator passed in has priority, followed by the rest.

#### Source:

```typescript
import type { SortComparator } from "../types/SortComparator.d.ts";

export const comparatorChain = <T>(
  ...comparators: SortComparator<T>[]
): SortComparator<T> => (a: T, b: T) => {
  const l = comparators.length;
  let depth = 0;
  let result = 0;

  while (result === 0 && depth < l) {
    result = comparators[depth](a, b);
    depth += 1;
  }
  return result;
};

export default comparatorChain;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("comparatorChain()", () => {
    Rhum.testCase("creates a chain of prioritized comparators", () => {
      type NameAge = { name: string; age: number };
      const testArr: NameAge[] = [
        {
          name: "alex",
          age: 25,
        },
        {
          name: "betty",
          age: 15,
        },
        {
          name: "carl",
          age: 25,
        },
      ];
      Rhum.asserts.assertEquals(
        testArr.sort(
          comparatorChain(
            (a: NameAge, b: NameAge) => a.age - b.age,
            (a: NameAge, b: NameAge) => a.name.localeCompare(b.name)
          )
        ),
        [
          {
            age: 15,
            name: "betty",
          },
          {
            age: 25,
            name: "alex",
          },
          {
            age: 25,
            name: "carl",
          },
        ]
      );
    });
  });
```

  