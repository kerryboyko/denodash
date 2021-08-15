## flatMapDeep

#### import

```typescript
import flatMapDeep from "https://deno.land/x/denodash@0.1.3/src/collection/flatMapDeep.ts";
```

#### signature

```typescript
flatMapDeep = <T, U>(iteratee: Iteratee<T, U>, arr: T[]): U[]
```

Runs each element through a iteratee, and returns a flatMap of the results after
being run through iteratee. T is the parameter type of iteratee, U is the return
type of the iteratee, which may or may not be the same type.

#### Source:

```typescript
import flatMapDepth from "./flatMapDepth.ts";
import type { Iteratee } from "../types/Iteratee.d.ts";
// Array.prototype.flatMap does not have Internet Explorer 11 support.
export const flatMapDeep = <T, U>(iteratee: Iteratee<T, U>, arr: T[]): U[] =>
  flatMapDepth(iteratee, arr, Number.MAX_SAFE_INTEGER);

export default flatMapDeep;
```

#### Test Examples:

```typescript
Rhum.testSuite("flatMapDeep()", () => {
  Rhum.testCase("should created a deeply flattened flatmap", () => {
    Rhum.asserts.assertEquals(
      flatMapDeep((x: number) => [[x * 2]], [1, 2, 3, 4]),
      [2, 4, 6, 8],
    );
  });
});
```
