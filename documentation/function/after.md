## after

#### import

```typescript
import after from "https://deno.land/x/denodash@0.1.1/src/function/after.ts";
```

#### signature

```typescript
after = (
      n: number,
      fn: Function
    ): ((...args: any) => any | void)
```

Invokes the provided function _only_ after it has been called n times
(inclusive). In other words, if n is 3, it will not be called on the first or
second invocation, but will be called on the third.

#### Source:

```typescript
export const after = (
  n: number,
  fn: Function,
): ((...args: any) => any | void) => {
  let count = 1;
  return (...args: any[]): void | any => {
    if (count >= n) {
      return fn(...args);
    }
    count += 1;
  };
};

export default after;
```

#### Test Examples:

```typescript
Rhum.testSuite("after", async () => {
  Rhum.testCase(
    "should invoke provided function only after called at least N times",
    () => {
      const log: any[] = [];
      const logger = (x: any) => {
        log.push(x);
      };
      const logAfterThree = after(3, logger);
      for (let i = 0; i < 10; i++) {
        logAfterThree(i);
      }
      Rhum.asserts.assertEquals(log, [2, 3, 4, 5, 6, 7, 8, 9]);
    },
  );
});
```
