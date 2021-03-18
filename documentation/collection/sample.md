
## sample

#### import
```typescript
import sample from "https://deno.land/x/denodash@0.1.2/src/collection/sample.ts"
```

#### signature
```typescript
sample = <T>(array: T[], sampleSize: number = 1): T[]
```

Randomly picks n (sampleSize) elements from an array. The same element will not be picked twice.

#### Source:

```typescript
import randomOf from "../utils/randomOf.ts";

export const sample = <T>(array: T[], sampleSize: number = 1): T[] => {
  const clone = array.slice();
  const l = array.length;
  let r: number; // random number;
  let temp: T; // storage;
  for (let i = 0; i < sampleSize; i++) {
    r = randomOf(l);
    temp = clone[r];
    clone[r] = clone[i];
    clone[i] = temp;
  }
  return clone.slice(0, sampleSize);
};

export default sample;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("sample()", () => {
    Rhum.testCase("gets N unique elements of an array", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const sampled1 = sample(arr, 3);
      Rhum.asserts.assertArrayContains(arr, sampled1);
      Rhum.asserts.assertStrictEquals(sampled1.length, 3);
      const sampled2 = sample(arr, 5);
      Rhum.asserts.assertArrayContains(arr, sampled2);
      Rhum.asserts.assertStrictEquals(sampled2.length, 5);
    });
  });
```

  