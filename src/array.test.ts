import { Rhum } from "../testing_deps.ts";

import bifurcate from "./array/bifurcate.ts";
import bifurcateBy from "./array/bifurcateBy.ts";
import cartesianProduct from "./array/cartesianProduct.ts";
import chunkIntoParts from "./array/chunkIntoParts.ts";

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

import intersectionBy from "./array/intersectionBy.ts";
import intersectionWith from "./array/intersectionWith.ts";
import lastIndexOf from "./array/lastIndexOf.ts";
import shank from "./array/shank.ts";
import union from "./array/union.ts";
import unionBy from "./array/unionBy.ts";
import unionWith from "./array/unionWith.ts";
import uniq from "./array/uniq.ts";
import uniqBy from "./array/uniqBy.ts";
import uniqWith from "./array/uniqWith.ts";

import unzip from "./array/unzip.ts";
import xor from "./array/xor.ts";
import zip from "./array/zip.ts";

Rhum.testPlan("array/*", () => {
  Rhum.testSuite("bifurcate()", () => {
    Rhum.testCase(
      "Should split values into two groups based on a given filter array",
      () => {
        Rhum.asserts.assertEquals(
          bifurcate(["beep", "boop", "foo", "bar"], [true, true, false, true]),
          [["beep", "boop", "bar"], ["foo"]]
        );
      }
    );
  });
  Rhum.testSuite("bifurcateBy()", () => {
    Rhum.testCase(
      "Should split values into two groups based on a given filter function",
      () => {
        Rhum.asserts.assertEquals(
          bifurcateBy(
            ["beep", "boop", "foo", "bar"],
            (x: string) => x.charAt(0) === "b"
          ),
          [["beep", "boop", "bar"], ["foo"]]
        );
      }
    );
  });
  Rhum.testSuite("cartesianProduct()", () => {
    Rhum.testCase(
      "Should calculate the cartesian product of two arrays",
      () => {
        Rhum.asserts.assertEquals(cartesianProduct(["x", "y"], [1, 2]), [
          ["x", 1],
          ["x", 2],
          ["y", 1],
          ["y", 2],
        ]);
      }
    );
  });
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
  Rhum.testSuite("chunkIntoParts()", () => {
    Rhum.testCase("should chunk into n parts", () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      Rhum.asserts.assertEquals(chunkIntoParts(testArray, 12), [
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9],
        [10],
        [11],
        [12],
      ]);
      Rhum.asserts.assertEquals(chunkIntoParts(testArray, 7), [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10],
        [11, 12],
      ]);

      Rhum.asserts.assertEquals(chunkIntoParts(testArray, 6), [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10],
        [11, 12],
      ]);
      Rhum.asserts.assertEquals(chunkIntoParts(testArray, 5), [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
      ]);
      Rhum.asserts.assertEquals(chunkIntoParts(testArray, 4), [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
      ]);
      Rhum.asserts.assertEquals(chunkIntoParts(testArray, 3), [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ]);
      Rhum.asserts.assertEquals(chunkIntoParts(testArray, 2), [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
      ]);
      Rhum.asserts.assertEquals(chunkIntoParts(testArray, 1), [testArray]);
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
  });
  Rhum.testSuite("intersectionBy()", () => {
    Rhum.testCase(
      "Creates an array of unique values that are included in all given arrays given an iterator",
      () => {
        Rhum.asserts.assertEquals(
          intersectionBy(Math.floor, [2.1, 1.2], [2.3, 3.4]),
          [2.1]
        );
        Rhum.asserts.assertEquals(
          intersectionBy(
            (obj: any) => obj["x"],
            [{ x: 1, y: 7 }],
            [
              { x: 2, y: 7 },
              { x: 1, y: 35 },
            ]
          ),
          [{ x: 1, y: 7 }]
        );
      }
    );
  });
  Rhum.testSuite("intersectionWith()", () => {
    Rhum.testCase(
      "Creates an array of unique values that are included in all given arrays given an comparator",
      () => {
        const objects = [
          { x: 1, y: 2 },
          { x: 2, y: 1 },
        ];
        const others = [
          { x: 1, y: 1 },
          { x: 1, y: 2 },
        ];
        Rhum.asserts.assertEquals(
          intersectionWith(
            (a, b) => JSON.stringify(a) === JSON.stringify(b),
            objects,
            others
          ),
          [{ x: 1, y: 2 }]
        );
      }
    );
  });
  Rhum.testSuite("zip()", () => {
    Rhum.testCase("should zip", () => {
      Rhum.asserts.assertEquals(zip(["a", "b"], [1, 2], [true, false]), [
        ["a", 1, true],
        ["b", 2, false],
      ]);
    });
  });

  Rhum.testSuite("lastIndexOf()", () => {
    Rhum.testCase("gets the last index of a value in an array ", () => {
      const testArr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
      Rhum.asserts.assertEquals(lastIndexOf(testArr, 3), 6);
    });
  });
  Rhum.testSuite("shank", () => {
    Rhum.testCase(
      "works like Array.prototype.splice() but returns new arrays rather than mutating existing ones.",
      () => {
        const names = ["alpha", "bravo", "charlie"];
        const namesAndDelta = shank(names, 1, 0, "delta");
        const namesNoBravo = shank(names, 1, 1);
        Rhum.asserts.assertEquals(namesAndDelta, [
          "alpha",
          "delta",
          "bravo",
          "charlie",
        ]);
        Rhum.asserts.assertEquals(namesNoBravo, ["alpha", "charlie"]);
        Rhum.asserts.assertEquals(names, ["alpha", "bravo", "charlie"]);
      }
    );
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
      Rhum.asserts.assertEquals(xor([2, 1], [2, 3]), [1, 3]);
    });
  });
});

Rhum.run();
