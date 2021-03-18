
## chunk

#### import
```typescript
import chunk from "https://deno.land/x/denodash@0.1.2/src/array/chunk.ts"
```

#### signature
```typescript
chunk = <T>(arr: T[], size: number = 1): T[][]
```

Takes an array (arr) and splits it into multiple arrays of size (size)

#### Source:

```typescript
export const chunk = <T>(arr: T[], size = 1): T[][] => {
  const mSize = Math.floor(size);
  const output: T[][] = [];
  if (mSize > 0) {
    for (let i = 0, l = arr.length; i < l; i += mSize) {
      output.push(arr.slice(i, i + mSize));
    }
  }
  return output;
};

export default chunk;

```

#### Test Examples: 

```typescript
Rhum.testSuite("chunk()", () => {
  const array = [0, 1, 2, 3, 4, 5];

  Rhum.testCase("should return chunked arrays", () => {
    const actual = chunk(array, 3);
    Rhum.asserts.assertEquals(actual, [
      [0, 1, 2],
      [3, 4, 5],
    ]);
  });

  Rhum.testCase("should return the last chunk as remaining elements", () => {
    const actual = chunk(array, 4);
    Rhum.asserts.assertEquals(actual, [
      [0, 1, 2, 3],
      [4, 5],
    ]);
  });

  Rhum.testCase("should ensure the minimum `size` is `0`", () => {
    const actual = chunk(array, -1);
    Rhum.asserts.assertEquals(actual, []);
  });

  Rhum.testCase("should coerce `size` to an integer", () => {
    Rhum.asserts.assertEquals(chunk(array, array.length / 4), [
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
    ]);
  });
});
```

  