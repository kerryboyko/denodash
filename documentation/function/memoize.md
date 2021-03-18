## memoize

#### import

```typescript
import memoize from "https://deno.land/x/denodash@0.1.1/src/function/memoize.ts";
```

#### signature

```typescript
memoize = 
    (
      fn: Function,
      hashingFn: HashingFunction = normalHashingFunction
    ): ((...args: any[]) => any)

    /* type HashingFunction = (...args: any[]) => string; */
```

Creates a function that memoizes the result of func by the result of a hashing
function. If no hashing function is provided, it uses normalHashingFunction,
which is (...args) => JSON.stringify(args)

#### Source:

```typescript
type HashingFunction = (...args: any[]) => string;

const normalHashingFunction: HashingFunction = (args: any[]): string =>
  JSON.stringify(args);

export const memoize = (
  fn: Function,
  hashingFn: HashingFunction = normalHashingFunction,
): ((...args: any[]) => any) => {
  const cache: Record<string, any> = {};
  return (...args: any[]) => {
    if (cache[hashingFn(...args)] === undefined) {
      cache[hashingFn(...args)] = fn(...args);
    }
    return cache[hashingFn(...args)];
  };
};

export default memoize;
```

#### Test Examples:

```typescript
Rhum.testSuite("memoize()", () => {
  Rhum.testCase("should memoize a function", async () => {
    let timesInvoked = 0;
    const testFn = (s: string) => {
      timesInvoked += 1;
      return s.split("").reverse().join("");
    };
    const memoTestFn = memoize(testFn);

    const t1 = memoTestFn("alpha");
    Rhum.asserts.assertStrictEquals(timesInvoked, 1);
    Rhum.asserts.assertStrictEquals(t1, "ahpla");

    const t2 = memoTestFn("beta");
    Rhum.asserts.assertStrictEquals(timesInvoked, 2);
    Rhum.asserts.assertStrictEquals(t2, "ateb");

    const t3 = memoTestFn("alpha");
    Rhum.asserts.assertStrictEquals(timesInvoked, 2);
    Rhum.asserts.assertStrictEquals(t3, "ahpla");

    const t4 = memoTestFn("beta");
    Rhum.asserts.assertStrictEquals(timesInvoked, 2);
    Rhum.asserts.assertStrictEquals(t4, "ateb");
  });
  Rhum.testCase("should memoize a function with a custom hash", async () => {
    let timesInvoked = 0;
    const testFn = (s: string) => {
      timesInvoked += 1;
      return s.split("").reverse().join("");
    };
    const customHasher = (s: string): string => s.charAt(0);
    const memoTestFn = memoize(testFn, customHasher);

    const t1 = memoTestFn("alpha");
    Rhum.asserts.assertStrictEquals(timesInvoked, 1);
    Rhum.asserts.assertStrictEquals(t1, "ahpla");

    const t2 = memoTestFn("beta");
    Rhum.asserts.assertStrictEquals(timesInvoked, 2);
    Rhum.asserts.assertStrictEquals(t2, "ateb");

    const t3 = memoTestFn("alpha");
    Rhum.asserts.assertStrictEquals(timesInvoked, 2);
    Rhum.asserts.assertStrictEquals(t3, "ahpla");

    const t4 = memoTestFn("beta");
    Rhum.asserts.assertStrictEquals(timesInvoked, 2);
    Rhum.asserts.assertStrictEquals(t4, "ateb");

    const t5 = memoTestFn("brian");
    Rhum.asserts.assertStrictEquals(timesInvoked, 2);
    Rhum.asserts.assertStrictEquals(t5, "ateb");
  });
});
```
