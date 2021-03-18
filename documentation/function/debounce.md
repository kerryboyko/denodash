
## debounce

#### import
```typescript
import debounce from "https://deno.land/x/denodash@0.1.2/src/function/debounce.ts"
```

#### signature
```typescript
debounce = (func: Function, wait = 0, immediate = false): {
      (...args: any[]): any;
      cancel(): void;
    }
```

Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. The debounced function comes with a cancel method to cancel delayed func invocations.
      
_This method is specifically requested for additional testing and code review._

#### Source:

```typescript
export const debounce = (func: Function, wait = 0, immediate = false): {
  (...args: any[]): any;
  cancel(): void;
} => {
  let timeout: ReturnType<typeof setTimeout>;
  let result: any;

  const later = (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    result = func(...args);
  };

  const debounced = (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow: boolean = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) {
        result = func(...args);
      }
    } else {
      timeout = setTimeout(later, wait);
    }
    return result;
  };

  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = 0;
  };

  return debounced;
};

export default debounce;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("debounce()", () => {
    Rhum.testCase("debounce", async () => {
      let counter = 0;
      const incr = () => {
        counter++;
      };
      const debouncedIncr = debounce(incr, 32);
      debouncedIncr();
      debouncedIncr();
      await delay(16);
      debouncedIncr();
      await delay(96);
      Rhum.asserts.assertStrictEquals(counter, 1);
    });

    Rhum.testCase("debounce cancel", async () => {
      let counter = 0;
      const incr = () => {
        counter++;
      };
      const debouncedIncr = debounce(incr, 32);
      debouncedIncr();
      debouncedIncr.cancel();
      await delay(96);
      Rhum.asserts.assertStrictEquals(counter, 0);
    });
  });
```

  