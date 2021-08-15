## chunkIntoParts

#### import

```typescript
import chunkIntoParts from "https://deno.land/x/denodash@0.1.3/src/array/chunkIntoParts.ts";
```

#### signature

```typescript
chunkIntoParts = <T>(arr: T[], parts = 1): T[][]
```

Takes an array (arr) and splits it into multiple parts (parts) of equal size.
For example: an array of length 10 split into 3 parts would be split into 4, 4,
and 2 parts

#### Source:

```typescript
import chunk from "./chunk.ts";

export const chunkIntoParts = <T>(arr: T[], parts = 1): T[][] => {
  const size = Math.ceil(arr.length / parts);
  return chunk(arr, size);
};

export default chunkIntoParts;
```

#### Test Examples:

```typescript
Rhum.testSuite("chunkIntoParts()", () => {
  Rhum.testCase("should chunk into n parts", () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    Rhum.asserts.assertEquals(chunkIntoParts(testArray, 12), [
      [1],
      [2],
      [3],
      [4],
      [5],
      [6],
      [7],
      [8],
      [9],
      [10],
      [11],
      [12],
    ]);
    Rhum.asserts.assertEquals(chunkIntoParts(testArray, 7), [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
      [11, 12],
    ]);

    Rhum.asserts.assertEquals(chunkIntoParts(testArray, 6), [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
      [11, 12],
    ]);
    Rhum.asserts.assertEquals(chunkIntoParts(testArray, 5), [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
    ]);
    Rhum.asserts.assertEquals(chunkIntoParts(testArray, 4), [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
    ]);
    Rhum.asserts.assertEquals(chunkIntoParts(testArray, 3), [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ]);
    Rhum.asserts.assertEquals(chunkIntoParts(testArray, 2), [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ]);
    Rhum.asserts.assertEquals(chunkIntoParts(testArray, 1), [testArray]);
  });
});
```
