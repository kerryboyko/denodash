## zip

#### import

```typescript
import zip from "https://deno.land/x/denodash@0.1.1/src/array/zip.ts";
```

#### signature

```typescript
zip = (...arrays: any[][]): any[]
```

Creates an array of grouped elements, the first of which contains the first
elements of the given arrays, the second of which contains the second elements
of the given arrays, and so on.

#### Source:

```typescript
const zip = (...arrays: any[][]): any[] => {
  const output: any[] = [];
  for (let i = 0, l = arrays[0].length; i < l; i++) {
    output.push(arrays.map((array) => array[i]));
  }
  return output;
};

export default zip;
```

#### Test Examples:

```typescript
Rhum.testSuite("zip()", () => {
  Rhum.testCase("should zip", () => {
    Rhum.asserts.assertEquals(zip(["a", "b"], [1, 2], [true, false]), [
      ["a", 1, true],
      ["b", 2, false],
    ]);
  });
});
```
