
## before

#### import
```typescript
import before from "https://deno.land/x/denodash@0.1.2/src/function/before.ts"
```

#### signature
```typescript
before = (
      n: number,
      fn: Function
    ): ((...args: any) => any | void)
```

Creates a function that invokes fn up to only n times. Subsequent calls will return the value returned on the nth invocation.

#### Source:

```typescript
export const before = (n: number, fn: Function) => {
  let count = 0;
  let result: any;
  return (...args: any[]): void | any => {
    if (count < n) {
      count += 1;
      result = fn(...args);
    }
    return result;
  };
};

export default before;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("before()", async () => {
    Rhum.testCase(
      "should invoke provided function only when before N times",
      () => {
        let count = 0;
        const incrementAndReturn = () => {
          count += 1;
          return count;
        };

        const beforeThree = before(3, incrementAndReturn);

        Rhum.asserts.assertStrictEquals(beforeThree(), 1);
        Rhum.asserts.assertStrictEquals(beforeThree(), 2);
        Rhum.asserts.assertStrictEquals(beforeThree(), 3);
        Rhum.asserts.assertStrictEquals(beforeThree(), 3);
        Rhum.asserts.assertStrictEquals(beforeThree(), 3);
      },
    );
  });
```

  