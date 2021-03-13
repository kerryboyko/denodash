import { Rhum } from "../testing_deps.ts";

import cloneDeep from "./lang/cloneDeep.ts";
import isEqual from "./lang/isEqual.ts";

Rhum.testPlan("lang/*", () => {
  Rhum.testSuite("cloneDeep()", () => {
    Rhum.testCase("should create a deep clone of an object", () => {
      const testObj = {
        a: {
          b: {
            c: "foo",
          },
        },
        d: {
          e: {
            f: "bar",
          },
        },
      };
      const testClone = cloneDeep(testObj);
      Rhum.asserts.assertStrictEquals(testObj.a.b.c, testClone.a.b.c);
      Rhum.asserts.assertEquals(testObj, testClone);
      Rhum.asserts.assertNotStrictEquals(testObj, testClone);
      Rhum.asserts.assertEquals(testObj.a, testClone.a);
      Rhum.asserts.assertNotStrictEquals(testObj.a, testClone.a);
    });
  });
  Rhum.testSuite("isEqual()", () => {
    Rhum.testCase("should correctly compare primatives", () => {
      // test code from Lodash
      const symbol1 = Symbol("a");
      const symbol2 = Symbol("b");
      const pairs = [
        [1, 1, true],
        [1, "1", false],
        [1, 2, false],
        [-0, -0, true],
        [0, 0, true],
        [-0, 0, true],
        [0, "0", false],
        [0, null, false],
        [NaN, NaN, true],
        [NaN, "a", false],
        [NaN, Infinity, false],
        ["a", "a", true],
        ["a", "b", false],
        ["a", ["a"], false],
        [true, true, true],
        [true, 1, false],
        [true, "a", false],
        [false, false, true],
        [false, 0, false],
        [false, "", false],
        [symbol1, symbol1, true],
        [symbol1, symbol2, false],
        [null, null, true],
        [null, undefined, false],
        [null, {}, false],
        [null, "", false],
        [undefined, undefined, true],
        [undefined, null, false],
        [undefined, "", false],
      ];

      for (let pair of pairs) {
        const [a, b, expected] = pair;
        Rhum.asserts.assertStrictEquals(isEqual(a, b), expected);
      }
    });
    Rhum.testCase("should compare arrays", () => {
      let array1: any[] = [true, null, 1, "a", undefined];
      let array2: any[] = [true, null, 1, "a", undefined];
      Rhum.asserts.assertStrictEquals(isEqual(array1, array2), true);

      array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];
      array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];

      Rhum.asserts.assertStrictEquals(isEqual(array1, array2), true);

      array1 = [1, 2, 3];
      array2 = [3, 2, 1];

      Rhum.asserts.assertStrictEquals(isEqual(array1, array2), false);

      array1 = [1, 2];
      array2 = [1, 2, 3];

      Rhum.asserts.assertStrictEquals(isEqual(array1, array2), false);
    });

    Rhum.testCase("should compare objects", () => {
      let obj1: any = {
        alpha: true,
        beta: null,
        gamma: 1,
        delta: "a",
        epsilon: undefined,
      };
      let obj2: any = {
        alpha: true,
        beta: null,
        gamma: 1,
        delta: "a",
        epsilon: undefined,
      };
      Rhum.asserts.assertStrictEquals(isEqual(obj1, obj2), true);

      obj1 = {
        ...obj1,
        squirrelGirl: {
          secretId: "Doreen Green",
          powers: "Squirrel",
        },
      };
      obj2 = { ...obj1 };

      Rhum.asserts.assertStrictEquals(isEqual(obj1, obj2), true);

      obj2 = {
        ...obj2,
        squirrelGirl: { ...obj2.squirrelGirl, secretId: "Doreen Allene Green" },
      };

      Rhum.asserts.assertStrictEquals(isEqual(obj1, obj2), false);

      obj2 = { ...obj1, "newPropThatDoesntExistOnObj1": "sf" };

      Rhum.asserts.assertStrictEquals(isEqual(obj1, obj2), false);
    });
  });
});

Rhum.run();
