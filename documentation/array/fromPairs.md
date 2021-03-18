
## fromPairs

#### import
```typescript
import fromPairs from "https://deno.land/x/denodash@0.1.2/src/array/fromPairs.ts"
```

#### signature
```typescript
fromPairs = <K extends string | number | symbol, T>(
      arr: Array<[K, T]>,
    ): Record<K, T>
```

Takes an array of tuples of [key: K, value: T] and returns an object where {[key: k]: value}

#### Source:

```typescript
export const fromPairs = <K extends string | number | symbol, T>(
  arr: Array<[K, T]>,
): Record<K, T> => {
  const record: Record<K, T> = {} as Record<K, T>;
  for (const tuple of arr) {
    if (["string", "number", "symbol"].includes(typeof tuple[0])) {
      record[tuple[0] as K] = tuple[1];
    } else {
      throw new TypeError(`Element ${tuple} does not have a valid key`);
    }
  }
  return record;
};

export default fromPairs;

```

#### Test Examples: 

```typescript
Rhum.testSuite("fromPairs()", () => {
  Rhum.testCase(
    "should create an object from an array of key value tuples",
    () => {
      const testArr: [string, number][] = [
        ["a", 1],
        ["b", 2],
      ];
      Rhum.asserts.assertEquals(fromPairs(testArr), { a: 1, b: 2 });
    },
  );
});
```

  