
## shank

#### import
```typescript
import shank from "https://deno.land/x/denodash@0.1.2/src/array/shank.ts"
```

#### signature
```typescript
shank = <T>(
      arr: T[],
      index: number = 0,
      delCount: number = 0,
      ...elements: T[]
    ): T[]
```

Works exactly like [Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), but returns a new array,
    rather than mutating the original.

#### Source:

```typescript
export const shank = <T>(
  arr: T[],
  index = 0,
  delCount = 0,
  ...elements: T[]
): T[] =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));

export default shank;

```

#### Test Examples: 

```typescript
Rhum.testSuite("shank", () => {
  Rhum.testCase(
    "works like Array.prototype.splice() but returns new arrays rather than mutating existing ones.",
    () => {
      const names = ["alpha", "bravo", "charlie"];
      const namesAndDelta = shank(names, 1, 0, "delta");
      const namesNoBravo = shank(names, 1, 1);
      Rhum.asserts.assertEquals(namesAndDelta, [
        "alpha",
        "delta",
        "bravo",
        "charlie",
      ]);
      Rhum.asserts.assertEquals(namesNoBravo, ["alpha", "charlie"]);
      Rhum.asserts.assertEquals(names, ["alpha", "bravo", "charlie"]);
    },
  );
});
```

  