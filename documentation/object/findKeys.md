## findKeys

#### import

```typescript
import findKeys from "https://deno.land/x/denodash@0.1.1/src/object/findKeys.ts";
```

#### signature

```typescript
findKeys = (
      obj: Record<string, any>,
      predicate: Predicate<any>,
    ): string[]
```

Returns a sorted list of all keys where the value at the key, run through
predicate, returns true

#### Source:

```typescript
import type { Predicate } from "../types/Predicate.d.ts";

export const findKeys = (
  obj: Record<string, any>,
  predicate: Predicate<any>,
): string[] => {
  let output: string[] = [];
  for (let key in obj) {
    if (predicate(obj[key])) {
      output.push(key);
    }
  }
  return output.sort();
};

export default findKeys;
```

#### Test Examples:

```typescript
Rhum.testSuite("findKeys()", () => {
  Rhum.testCase("should find all keys where the value holds true", () => {
    Rhum.asserts.assertEquals(
      findKeys({ a: 1, b: 2, c: 3 }, (x: number) => x % 2 === 1),
      ["a", "c"],
    );
    Rhum.asserts.assertEquals(
      findKeys({ c: 1, b: 2, a: 3 }, (x: number) => x % 2 === 1),
      ["a", "c"],
    );
  });
});
```
