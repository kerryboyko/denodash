
## sampleOne

#### import
```typescript
import sampleOne from "https://deno.land/x/denodash@0.1.1/src/collection/sampleOne.ts"
```

#### signature
```typescript
sampleOne = <T>(array: T[]): T
```

Randomly picks one random element from an array

#### Source:

```typescript
import randomOf from "../utils/randomOf.ts";

export const sampleOne = <T>(array: T[]): T => array[randomOf(array.length)];

export default sampleOne;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("sampleOne()", () => {
    Rhum.testCase("returns one random element of an array", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const one = sampleOne(arr);
      Rhum.asserts.assertArrayContains(arr, one);
      Rhum.asserts.assertEquals(Array.isArray(one), false);
    });
  });
```

  