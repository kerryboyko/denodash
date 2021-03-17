
## shuffle

#### import
```typescript
import shuffle from "https://deno.land/x/denodash@0.1.1/src/collection/shuffle.ts"
```

#### signature
```typescript
shuffle = <T>(array: T[]): T[]
```

Implements a Fischer-Yates shuffler. Takes an array and returns a new array with the same elements but randomly shuffled.

#### Source:

```typescript
import randomOf from "../utils/randomOf.ts";

export const shuffle = <T>(array: T[]): T[] => {
  const clone = array.slice();
  const l = array.length;
  let r: number; // random number;
  let temp: T; // storage;
  for (let i = 0; i < l; i++) {
    r = randomOf(l);
    temp = clone[r];
    clone[r] = clone[i];
    clone[i] = temp;
  }
  return clone;
};

export default shuffle;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("shuffle()", () => {
    Rhum.testCase("shuffles an array", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const shuffled = shuffle(arr);
      Rhum.asserts.assertArrayContains(shuffled, arr);
      Rhum.asserts.assertNotEquals(shuffled, arr); // this test may fail, the chances of that however, are 10!:1 (3.6M/1);
    });
  });
```

  