## union

#### import

```typescript
import union from "https://deno.land/x/denodash@0.1.3/src/array/union.ts";
```

#### signature

```typescript
union = <T>(...arrays: T[][]): T[]
```

Creates an array of unique values, in order, from all given arrays.

#### Source:

```typescript
import unionBy from "./unionBy.ts";
import identity from "../utils/identity.ts";

export const union = <T>(...arrays: T[][]): T[] =>
  unionBy<T>(identity, ...arrays);

export default union;
```

#### Test Examples:

```typescript
Rhum.testSuite("union()", () => {
  Rhum.testCase(
    "Creates an array of unique values, in order, from all given arrays",
    () => {
      Rhum.asserts.assertEquals(union([2, 1, 3], [4, 3, 7]), [2, 1, 3, 4, 7]);
    },
  );
});
```
