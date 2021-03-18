import { Rhum } from "../testing_deps.ts";
import randomOf from "./utils/randomOf.ts";

import comparatorChain from "./utils/comparatorChain.ts";
import delay from "./utils/delay.ts";
import identity from './utils/identity.ts';

Rhum.testPlan("utils/*", () => {
  Rhum.testSuite("comparatorChain()", () => {
    Rhum.testCase("creates a chain of prioritized comparators", () => {
      type NameAge = { name: string; age: number };
      const testArr: NameAge[] = [
        {
          name: "alex",
          age: 25,
        },
        {
          name: "betty",
          age: 15,
        },
        {
          name: "carl",
          age: 25,
        },
      ];
      Rhum.asserts.assertEquals(
        testArr.sort(
          comparatorChain(
            (a: NameAge, b: NameAge) => a.age - b.age,
            (a: NameAge, b: NameAge) => a.name.localeCompare(b.name)
          )
        ),
        [
          {
            age: 15,
            name: "betty",
          },
          {
            age: 25,
            name: "alex",
          },
          {
            age: 25,
            name: "carl",
          },
        ]
      );
    });
  });
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
  Rhum.testSuite("randomOf()", () => {
    Rhum.testCase("gets a random integer number from 0 to n - 1", () => {
      const r = randomOf(10);
      for (let i = 0; i < 50; i++) {
        Rhum.asserts.assertArrayContains([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], r);
      }
    });
  });
  Rhum.testSuite("identity()", () => {
    Rhum.testCase("returns what is passed to it.", () => {
      Rhum.asserts.assertStrictEquals(identity(0), 0);
      Rhum.asserts.assertStrictEquals(identity(42), 42);
      Rhum.asserts.assertStrictEquals(identity("foo"), "foo");
      const referenceToArray = [1, 2, 3];
      Rhum.asserts.assertEquals(identity(referenceToArray), referenceToArray);
      Rhum.asserts.assertStrictEquals(identity(referenceToArray), referenceToArray);

    });
  });
});

Rhum.run();
