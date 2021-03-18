## defer

#### import

```typescript
import defer from "https://deno.land/x/denodash@0.1.1/src/function/defer.ts";
```

#### signature

```typescript
defer = (fn: Function, ...args: any[]): void
```

Defers invoking the func until the current call stack has cleared. Any
additional arguments are provided to func when it's invoked.

_This method is specifically requested for additional testing and code review._

#### Source:

```typescript
export const defer = (fn: Function, ...args: any[]): void => {
  setTimeout(() => fn(...args), 0);
};

export default defer;
```

#### Test Examples:

```typescript
Rhum.testSuite("defer()", () => {
  Rhum.testCase(
    "Should defer a function until the call stack has cleared",
    async () => {
      let deferred = false;
      defer((bool: boolean): void => {
        deferred = bool;
      }, true);
      await delay(50);
      Rhum.asserts.assertStrictEquals(deferred, true);
    },
  );
});
```
