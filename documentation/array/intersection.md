
## intersection

#### import
```typescript
import intersection from "https://deno.land/x/denodash@0.1.2/src/array/intersection.ts"
```

#### signature
```typescript
intersection = <T>(...arrays: T[][]): T[]
```

Takes any number of arrays and returns every element that occurs in each array. The order is determined by the first array passed in.

#### Source:

```typescript
import intersectionBy from "./intersectionBy.ts";
import identity from "../utils/identity.ts";

export const intersection = <T>(...arrays: T[][]): T[] =>
  intersectionBy<T>(identity, ...arrays);

export default intersection;

```

#### Test Examples: 

```typescript
Rhum.testSuite("intersection()", () => {
  Rhum.testCase(
    "Creates an array of unique values that are included in all given arrays",
    () => {
      const testArrs = [
        [2, 1],
        [2, 3],
      ];
      Rhum.asserts.assertEquals(intersection(...testArrs), [2]);
    },
  );
});
```

  