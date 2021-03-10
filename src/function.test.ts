import { Rhum } from "../testing_deps.ts";

import after from "./function/after.ts";
import delay from "./utils/delay.ts";
import throttle from "./function/throttle.ts";
import debounce from "./function/debounce.ts";
import before from "./function/before.ts";
import memoize from './function/memoize.ts';

Rhum.testPlan("function/*", async () => {
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
      }
    );
  });
  Rhum.testSuite("before()", async () => {
    Rhum.testCase(
      "should invoke provided function only when before N times",
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
      }
    );
  });

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
        "incr was called immediately"
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
        "throttled functions return their value"
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
      }
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
      }
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
      }
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
      }
    );
  });
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
  Rhum.testSuite("before()", () => {
    Rhum.testCase(
      "should only invoke provide function if called before N times, otherwise return last result",
      () => {
        let counter = 0;
        let expected: number;
        const incr = () => {
          counter += 1;
          return counter;
        };
        const beforeIncr = before(3, incr);
        expected = beforeIncr();
        Rhum.asserts.assertStrictEquals(expected, 1);
        expected = beforeIncr();
        Rhum.asserts.assertStrictEquals(expected, 2);
        expected = beforeIncr();
        Rhum.asserts.assertStrictEquals(expected, 3);
        expected = beforeIncr();
        Rhum.asserts.assertStrictEquals(expected, 3);
        expected = beforeIncr();
        Rhum.asserts.assertStrictEquals(expected, 3);
      }
    );
  });
  Rhum.testSuite("memoize()", () => {
    Rhum.testCase(
      "should memoize a function",
      async () => {
        let timesInvoked = 0; 
        const testFn = (s: string) => {
          timesInvoked += 1;
          return s.split("").reverse().join("")
        }
        const memoTestFn = memoize(testFn);

        const t1 = memoTestFn('alpha');
        Rhum.asserts.assertStrictEquals(timesInvoked, 1);
        Rhum.asserts.assertStrictEquals(t1, 'ahpla');

        const t2 = memoTestFn('beta');
        Rhum.asserts.assertStrictEquals(timesInvoked, 2);
        Rhum.asserts.assertStrictEquals(t2, 'ateb');

        const t3 = memoTestFn('alpha')
        Rhum.asserts.assertStrictEquals(timesInvoked, 2);
        Rhum.asserts.assertStrictEquals(t3, 'ahpla');

        const t4 = memoTestFn('beta');
        Rhum.asserts.assertStrictEquals(timesInvoked, 2);
        Rhum.asserts.assertStrictEquals(t4, 'ateb');
      }
    );
    Rhum.testCase(
      "should memoize a function with a custom hash",
      async () => {
        let timesInvoked = 0; 
        const testFn = (s: string) => {
          timesInvoked += 1;
          return s.split("").reverse().join("")
        }
        const customHasher = (s: string):string => s.charAt(0)
        const memoTestFn = memoize(testFn, customHasher);

        const t1 = memoTestFn('alpha');
        Rhum.asserts.assertStrictEquals(timesInvoked, 1);
        Rhum.asserts.assertStrictEquals(t1, 'ahpla');

        const t2 = memoTestFn('beta');
        Rhum.asserts.assertStrictEquals(timesInvoked, 2);
        Rhum.asserts.assertStrictEquals(t2, 'ateb');

        const t3 = memoTestFn('alpha')
        Rhum.asserts.assertStrictEquals(timesInvoked, 2);
        Rhum.asserts.assertStrictEquals(t3, 'ahpla');

        const t4 = memoTestFn('beta');
        Rhum.asserts.assertStrictEquals(timesInvoked, 2);
        Rhum.asserts.assertStrictEquals(t4, 'ateb');

        const t5 = memoTestFn('brian');
        Rhum.asserts.assertStrictEquals(timesInvoked, 2);
        Rhum.asserts.assertStrictEquals(t5, 'ateb');
      }
    );
  });
});

Rhum.run();
