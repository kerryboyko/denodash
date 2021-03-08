import { Rhum } from "../testing_deps.ts";
import heapSort from "./utils/heapSort.ts";
import mergeSort from "./utils/mergeSort.ts";
import randomOf from './utils/randomOf.ts';

import comparatorChain from "./utils/comparatorChain.ts";

Rhum.testPlan("utils/*", () => {
  Rhum.testSuite("mergeSort()()", () => {
    Rhum.testCase("is a merge sort", () => {
      Rhum.asserts.assertEquals(
        mergeSort((a: number, b: number) => a - b)([
          0,
          8,
          9,
          7,
          6,
          5,
          2,
          3,
          4,
          1,
        ]),
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      );
      Rhum.asserts.assertEquals(
        mergeSort((a: number, b: number) => b - a)([
          0,
          8,
          9,
          7,
          6,
          5,
          2,
          3,
          4,
          1,
        ]),
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
      );

      const testArr = ["betty", "alex", "carl"].map((name: string) => ({
        name,
      }));
      Rhum.asserts.assertEquals(
        mergeSort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        )(testArr),
        [
          {
            name: "alex",
          },
          {
            name: "betty",
          },
          {
            name: "carl",
          },
        ]
      );
    });
  });
  Rhum.testSuite("comparatorChain() /w mergeSort()()", () => {
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
        mergeSort(
          comparatorChain(
            (a: NameAge, b: NameAge) => a.age - b.age,
            (a: NameAge, b: NameAge) => a.name.localeCompare(b.name)
          )
        )(testArr),
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
  Rhum.testSuite("heapSort()()", () => {
    Rhum.testCase("is a heap sort", () => {
      Rhum.asserts.assertEquals(
        heapSort((a: number, b: number) => a - b)([
          0,
          8,
          9,
          7,
          6,
          5,
          2,
          3,
          4,
          1,
        ]),
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      );
      Rhum.asserts.assertEquals(
        heapSort((a: number, b: number) => b - a)([
          0,
          8,
          9,
          7,
          6,
          5,
          2,
          3,
          4,
          1,
        ]),
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
      );

      const testArr = ["betty", "alex", "carl"].map((name: string) => ({
        name,
      }));
      Rhum.asserts.assertEquals(
        heapSort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        )(testArr),
        [
          {
            name: "alex",
          },
          {
            name: "betty",
          },
          {
            name: "carl",
          },
        ]
      );
    });
  });
  Rhum.testSuite("comparatorChain() /w heapSort()()", () => {
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
        heapSort(
          comparatorChain(
            (a: NameAge, b: NameAge) => a.age - b.age,
            (a: NameAge, b: NameAge) => a.name.localeCompare(b.name)
          )
        )(testArr),
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
      for(let i = 0; i < 50; i++){
        Rhum.asserts.assertArrayContains([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], r);
      }
    });
  });
});

Rhum.run();
