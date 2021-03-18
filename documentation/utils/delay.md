## delay

#### import

```typescript
import delay from "https://deno.land/x/denodash@0.1.1/src/utils/delay.ts";
```

#### signature

```typescript
delay = (time: number, fn?: Function, ...args: any[]): Promise<any>
```

Creates a promise which resolves only after a number of milliseconds (time) has
passed.

#### Source:

```typescript
export const delay = (
  time: number,
  fn?: Function,
  ...args: any[]
): Promise<any> =>
  new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(fn ? fn(...args) : undefined);
    }, time);
  });

export default delay;
```

#### Test Examples:

```typescript
Rhum.testSuite("delay()", () => {
  Rhum.testCase("delays execution of a function", async () => {
    let count = 0;
    setTimeout(() => {
      count = 10;
    }, 20);
    Rhum.asserts.assertStrictEquals(count, 0);
    await delay(30);
    Rhum.asserts.assertStrictEquals(count, 10);
    delay(20, () => {
      count = 20;
    });
    Rhum.asserts.assertStrictEquals(count, 10);
    await delay(30);
    Rhum.asserts.assertStrictEquals(count, 20);
  });
});
```
