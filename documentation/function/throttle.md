
## throttle

#### import
```typescript
import throttle from "https://deno.land/x/denodash@0.1.2/src/function/throttle.ts"
```

#### signature
```typescript
throttle = (
      func: Function,
      wait = 0,
      options: ThrottleOptions = { leading: true, trailing: true },
    ): {
      (...args: any[]): any;
      cancel(): void;
    }
```

Creates a throttled function that only invokes func at most once per every wait milliseconds.
    
_This method is specifically requested for additional testing and code review._

#### Source:

```typescript
interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export const throttle = (
  func: Function,
  wait = 0,
  options: ThrottleOptions = { leading: true, trailing: true },
): {
  (...args: any[]): any;
  cancel(): void;
} => {
  let timeout: ReturnType<typeof setTimeout>;
  let result: any;
  let args: any[] = [];
  let previous = 0;

  const later = (): void => {
    previous = options.leading === false ? 0 : Date.now();
    timeout = 0;
    result = func(...args);
    if (!timeout) {
      args = [];
    }
  };

  const throttled = (...currentArgs: any[]) => {
    const now = Date.now();
    if (!previous && options.leading === false) {
      previous = now;
    }
    let remaining = wait - (now - previous);
    args = currentArgs;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
      }
      previous = now;
      result = func(...currentArgs);
      if (!timeout) {
        args = [];
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = () => {
    clearTimeout(timeout);
    previous = 0;
    args = [];
    timeout = 0;
  };

  return throttled;
};

export default throttle;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("throttle()", () => {
    Rhum.testCase("basic throttle", async () => {
      let counter = 0;
      const incr = () => {
        counter++;
      };
      const throttledIncr = throttle(incr, 32);
      throttledIncr();
      throttledIncr();

      Rhum.asserts.assertStrictEquals(
        counter,
        1,
        "incr was called immediately",
      );
      await delay(64);
      Rhum.asserts.assertStrictEquals(counter, 2);
    });

    Rhum.testCase("throttle arguments", async () => {
      let value = 0;
      const update = function (val: number) {
        value = val;
      };
      const throttledUpdate = throttle(update, 32);
      throttledUpdate(1);
      throttledUpdate(2);
      Rhum.asserts.assertStrictEquals(value, 1);
      await delay(64);
      throttledUpdate(3);
      await delay(104);
      Rhum.asserts.assertStrictEquals(value, 3);
    });

    Rhum.testCase("throttle once", async () => {
      let counter = 0;
      const incr = () => {
        return ++counter;
      };
      const throttledIncr = throttle(incr, 32);
      const result = throttledIncr();
      await delay(64);
      Rhum.asserts.assertStrictEquals(
        result,
        1,
        "throttled functions return their value",
      );
      Rhum.asserts.assertStrictEquals(counter, 1);
    });

    Rhum.testCase("more throttling", async () => {
      let counter = 0;
      const incr = () => {
        counter++;
      };
      const throttledIncr = throttle(incr, 30);
      throttledIncr();
      throttledIncr();
      Rhum.asserts.assertStrictEquals(counter, 1);
      await delay(85);
      Rhum.asserts.assertStrictEquals(counter, 2);
      throttledIncr();
      Rhum.asserts.assertStrictEquals(counter, 3);
    });

    Rhum.testCase("throttle repeatedly with results", async () => {
      let counter = 0;
      const incr = () => {
        return ++counter;
      };
      const throttledIncr = throttle(incr, 100);
      let results: any = [];
      const saveResult = () => {
        results.push(throttledIncr());
      };
      saveResult(); // 0
      saveResult(); // 1
      await delay(50);
      saveResult(); // 2
      await delay(200);
      saveResult(); // 3
      await delay(10);
      saveResult(); // 4
      await delay(140);
      Rhum.asserts.assertStrictEquals(results[0], 1);
      Rhum.asserts.assertStrictEquals(results[1], 1);
      Rhum.asserts.assertStrictEquals(results[2], 1);
      Rhum.asserts.assertStrictEquals(results[3], 3);
      Rhum.asserts.assertStrictEquals(results[4], 3);
    });

    Rhum.testCase(
      "throttle triggers trailing call when invoked repeatedly",
      async () => {
        let counter = 0;
        let limit = 48;
        const incr = () => {
          counter++;
        };
        const throttledIncr = throttle(incr, 32);

        let stamp = Date.now();
        while (Date.now() - stamp < limit) {
          throttledIncr();
        }
        let lastCount = counter;
        Rhum.asserts.assertEquals(true, counter > 1);

        await delay(96);
        Rhum.asserts.assertEquals(true, counter > lastCount);
      },
    );

    Rhum.testCase(
      "throttle does not trigger leading call when leading is set to false",
      async () => {
        let counter = 0;
        const incr = () => {
          counter++;
        };
        const throttledIncr = throttle(incr, 60, { leading: false });

        throttledIncr();
        throttledIncr();
        Rhum.asserts.assertStrictEquals(counter, 0);

        await delay(96);
        Rhum.asserts.assertStrictEquals(counter, 1);
      },
    );

    Rhum.testCase(
      "more throttle does not trigger leading call when leading is set to false",
      async () => {
        let counter = 0;
        const incr = () => {
          counter++;
        };
        const throttledIncr = throttle(incr, 100, { leading: false });

        throttledIncr();
        await delay(50);
        throttledIncr();
        await delay(10);
        throttledIncr();
        Rhum.asserts.assertStrictEquals(counter, 0);
        await delay(140);
        throttledIncr();

        Rhum.asserts.assertStrictEquals(counter, 1);

        await delay(100);
        Rhum.asserts.assertStrictEquals(counter, 2);
      },
    );

    Rhum.testCase("one more throttle with leading: false test", async () => {
      let counter = 0;
      const incr = () => {
        counter++;
      };
      const throttledIncr = throttle(incr, 100, { leading: false });

      let time = Date.now();
      while (Date.now() - time < 350) {
        throttledIncr();
      }
      Rhum.asserts.assertEquals(true, counter <= 3);

      await delay(200);
      Rhum.asserts.assertEquals(true, counter <= 4);
    });

    Rhum.testCase(
      "throttle does not trigger trailing call when trailing is set to false",
      async () => {
        let counter = 0;
        const incr = () => {
          counter++;
        };
        const throttledIncr = throttle(incr, 60, { trailing: false });

        throttledIncr();
        throttledIncr();
        throttledIncr();
        Rhum.asserts.assertStrictEquals(counter, 1);

        await delay(96);
        Rhum.asserts.assertStrictEquals(counter, 1);

        throttledIncr();
        throttledIncr();
        Rhum.asserts.assertStrictEquals(counter, 2);

        await delay(96);
        Rhum.asserts.assertStrictEquals(counter, 2);
      },
    );
  });
```

  