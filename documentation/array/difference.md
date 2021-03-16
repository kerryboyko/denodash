
## difference

#### import
```typescript
import difference from "https://deno.land/x/denodash@0.1.1/src/array/difference.ts"
```

#### signature
```typescript
difference = <T>(a: T[], b: T[]): T[]
```

Takes two arrays (a, b) and returns an array of elements in a that do not exist in b

#### Source:

```typescript
import differenceBy from "./differenceBy.ts";
import identity from "../utils/identity.ts";

export const difference = <T>(a: T[], b: T[]): T[] => differenceBy(identity, a, b);

export default difference;

```

#### Test Examples: 

```typescript
Rhum.testSuite("difference()", () => {
  Rhum.testCase("should return the difference of two arrays", () => {
    const a = [0, 1, 2];
    const b = [0, 5, 2];
    Rhum.asserts.assertEquals(difference(a, b), [1]);
  });
});
```

  