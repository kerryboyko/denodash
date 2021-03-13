import { Rhum } from "../testing_deps.ts";
import randomOf from "./utils/randomOf.ts";

import comparatorChain from "./utils/comparatorChain.ts";

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
  Rhum.testSuite("randomOf()", () => {
    Rhum.testCase("gets a random integer number from 0 to n - 1", () => {
      const r = randomOf(10);
      for (let i = 0; i < 50; i++) {
        Rhum.asserts.assertArrayContains([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], r);
      }
    });
  });
});

Rhum.run();
