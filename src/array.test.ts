import { Rhum } from "../testing_deps.ts";

import chunk from "./array/chunk.ts";
import difference from "./array/difference.ts";
import differenceWith from "./array/differenceWith.ts";
import dropWhile from "./array/dropWhile.ts";
import dropWhileRight from "./array/dropWhileRight.ts";
import findLastIndex from "./array/findLastIndex.ts";
import flatten from "./array/flatten.ts";
import flattenDeep from "./array/flattenDeep.ts";
import flattenDepth from "./array/flattenDepth.ts";
import fromPairs from "./array/fromPairs.ts";
import intersection from "./array/intersection.ts";
import zip from './array/zip.ts';
import unzip from './array/unzip.ts';
import xor from './array/xor.ts';

Rhum.testPlan("array.ts", () => {
  Rhum.testSuite("chunk()", () => {
    const array = [0, 1, 2, 3, 4, 5];

    Rhum.testCase("should return chunked arrays", () => {
      const actual = chunk(array, 3);
      Rhum.asserts.assertEquals(actual, [
        [0, 1, 2],
        [3, 4, 5],
      ]);
    });

    Rhum.testCase("should return the last chunk as remaining elements", () => {
      const actual = chunk(array, 4);
      Rhum.asserts.assertEquals(actual, [
        [0, 1, 2, 3],
        [4, 5],
      ]);
    });

    Rhum.testCase("should ensure the minimum `size` is `0`", () => {
      const actual = chunk(array, -1);
      Rhum.asserts.assertEquals(actual, []);
    });

    Rhum.testCase("should coerce `size` to an integer", () => {
      Rhum.asserts.assertEquals(chunk(array, array.length / 4), [
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
      ]);
    });
  });
  Rhum.testSuite("difference()/differenceBy()", () => {
    Rhum.testCase("should return the difference of two arrays", () => {
      const a = [0, 1, 2];
      const b = [0, 5, 2];
      Rhum.asserts.assertEquals(difference(a, b), [1]);
    });
    Rhum.testCase("accepts an iteratee as third parameter", () => {
      const a = [0.3, 1.7, 6.2, 3.2];
      const b = [0.5, 2.1, 6.8];
      Rhum.asserts.assertEquals(difference(a, b, Math.floor), [1.7, 3.2]);
    });
  });
  Rhum.testSuite("differenceWith()", () => {
    Rhum.testCase(
      "should work with a comparator as the third parameter",
      () => {
        const objects = [
          { x: 1, y: 2 },
          { x: 1, y: 4 },
          { x: 2, y: 1 },
        ];
        const actual1 = differenceWith(
          objects,
          [{ x: 1, y: 2 }],
          (obj1, obj2) => obj1.x === obj2.x
        );
        const actual2 = differenceWith(
          objects,
          [{ x: 3, y: 2 }],
          (obj1, obj2) => obj1.y === obj2.y
        );

        Rhum.asserts.assertEquals(actual1, [{ x: 2, y: 1 }]);
        Rhum.asserts.assertEquals(actual2, [
          { x: 1, y: 4 },
          { x: 2, y: 1 },
        ]);
      }
    );
  });
  Rhum.testSuite("dropWhile()", () => {
    Rhum.testCase(
      "should drop elements until it finds the first element that doesn't match",
      () => {
        const testArr = [1, 2, 3, 4, 3, 2, 1];
        Rhum.asserts.assertEquals(
          dropWhile(testArr, (x) => x < 3),
          [3, 4, 3, 2, 1]
        );
      }
    );
  });
  Rhum.testSuite("dropWhileRight()", () => {
    Rhum.testCase(
      "should drop elements from the end until it finds the first element that doesn't match",
      () => {
        const testArr = [1, 2, 3, 4, 3, 2, 1];
        Rhum.asserts.assertEquals(
          dropWhileRight(testArr, (x) => x < 3),
          [1, 2, 3, 4, 3]
        );
      }
    );
  });
  Rhum.testSuite("findLastIndex()", () => {
    Rhum.testCase("should find the last index that matches", () => {
      const testArr = [1, 2, 3, 4, 3, 2, 1];
      Rhum.asserts.assertEquals(
        findLastIndex(testArr, (x: number) => x === 3),
        4
      );
    });
  });
  Rhum.testSuite("flatten()", () => {
    Rhum.testCase("should flatten an index one level", () => {
      const testArr = [1, [2, [3, [4]], 5]];
      Rhum.asserts.assertEquals(flatten(testArr), [1, 2, [3, [4]], 5]);
    });
  });
  Rhum.testSuite("flattenDeep()", () => {
    Rhum.testCase("should flatten an index completely", () => {
      const testArr = [1, [2, [3, [4]], 5]];
      Rhum.asserts.assertEquals(flattenDeep(testArr), [1, 2, 3, 4, 5]);
    });
  });
  Rhum.testSuite("flattenDepth()", () => {
    Rhum.testCase("should flatten an index n levels", () => {
      const testArr = [1, [2, [3, [4]], 5]];
      Rhum.asserts.assertEquals(flattenDepth(testArr, 1), [1, 2, [3, [4]], 5]);
      Rhum.asserts.assertEquals(flattenDepth(testArr, 2), [1, 2, 3, [4], 5]);
      Rhum.asserts.assertEquals(flattenDepth(testArr, 5), [1, 2, 3, 4, 5]);
    });
  });
  Rhum.testSuite("fromPairs()", () => {
    Rhum.testCase(
      "should create an object from an array of key value tuples",
      () => {
        const testArr = [
          ["a", 1],
          ["b", 2],
        ];
        Rhum.asserts.assertEquals(fromPairs(testArr), { a: 1, b: 2 });
      }
    );
  });
  Rhum.testSuite("intersection()", () => {
    Rhum.testCase(
      "Creates an array of unique values that are included in all given arrays",
      () => {
        const testArrs = [
          [2, 1],
          [2, 3],
        ];
        Rhum.asserts.assertEquals(intersection(...testArrs), [2]);
      }
    );
    // Rhum.testCase(
    //   "Creates an array of unique values that are included in all given arrays given an iteratee",
    //   () => {
    //     Rhum.asserts.assertEquals(
    //       intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor),
    //       [2.1]
    //     );
    //   }
    // );
    // Rhum.testCase(
    //   "Creates an array of unique values when referencing by object property",
    //   () => {
    //     Rhum.asserts.assertEquals(
    //       intersectionBy(
    //         [{ x: 1, y: 2 }],
    //         [
    //           { x: 2, q: 4 },
    //           { x: 1, z: 4 },
    //         ],
    //         "x"
    //       ),
    //       [{ x: 1, y: 2 }]
    //     );
    //   }
    // );
  });
  Rhum.testSuite("zip()", () => {
    Rhum.testCase("should zip", () => {
      Rhum.asserts.assertEquals(zip(["a", "b"], [1, 2], [true, false]), [
        ["a", 1, true],
        ["b", 2, false],
      ]);
    });
  });
  Rhum.testSuite("unzip()", () => {
    Rhum.testCase("should unzip", () => {
      Rhum.asserts.assertEquals(
        unzip([
          ["a", 1, true],
          ["b", 2, false],
        ]),
        [
          ["a", "b"],
          [1, 2],
          [true, false],
        ]
      );
    });
  });
  Rhum.testSuite("xor()", () => {
    Rhum.testCase("should produce the symmetric difference", () => {
      Rhum.asserts.assertEquals(
        xor([2, 1], [2, 3]),
        [
          1, 3
        ]
      );
    });
  });
});

Rhum.run();
