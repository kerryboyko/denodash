## once

#### import

```typescript
import once from "https://deno.land/x/denodash@0.1.3/src/function/once.ts";
```

#### signature

```typescript
once = (fn: Function): ((...args: any) => any | void)
```

Creates a function that only runs once. Further invocations will return the same
value as originally resolved.

#### Source:

```typescript
import before from "./before.ts";

export const once = (fn: Function): ((...args: any) => any | void) =>
  before(1, fn);

export default once;
```

#### Test Examples:

```typescript
Rhum.testSuite("once()", () => {
  Rhum.testCase("should only invoke provided function once", () => {
    let counter = 0;
    let expected: number;
    const incr = (n: number) => {
      counter += 1;
      return n;
    };
    const onceIncr = once(incr);
    expected = onceIncr(4);
    Rhum.asserts.assertStrictEquals(expected, 4);
    Rhum.asserts.assertStrictEquals(counter, 1);
    expected = onceIncr(70);
    Rhum.asserts.assertStrictEquals(expected, 4);
    Rhum.asserts.assertStrictEquals(counter, 1);
    expected = onceIncr(52830);
    Rhum.asserts.assertStrictEquals(expected, 4);
    Rhum.asserts.assertStrictEquals(counter, 1);
  });
});
```
