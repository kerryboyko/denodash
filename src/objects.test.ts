import { Rhum } from "../testing_deps.ts";

import mapObject from "./objects/mapObject.ts";
import invert from './objects/invert.ts';
import findKeys from './objects/findKeys.ts';

Rhum.testPlan("objects/*", async () => {
  Rhum.testSuite("mapObject()", async () => {
    Rhum.testCase("should map an object", () => {
      const testObj = {
        one: 1,
        two: 2,
        three: 3,
      };
      const returned = mapObject<number, string>(testObj, (n: number): string =>
        (n * n * 100).toString()
      );
      Rhum.asserts.assertEquals(returned, {
        one: "100",
        two: "400",
        three: "900",
      });
    });
  });
  Rhum.testSuite("invert()", async () => {
    Rhum.testCase("should invert an objects keys and values", () => {
      Rhum.asserts.assertEquals(
        invert({ Moe: "Moses", Larry: "Louis", Curly: "Jerome" }),
        { Moses: "Moe", Louis: "Larry", Jerome: "Curly" }
      );
    });
  });
  Rhum.testSuite("findKeys()", async () => {
    Rhum.testCase("should find all keys where the value holds true", () => {
      Rhum.asserts.assertEquals(
        findKeys({a: 1, b: 2, c: 3}, (x: number) => x % 2 === 1),
        ['a', 'c']
      );
      Rhum.asserts.assertEquals(
        findKeys({c: 1, b: 2, a: 3}, (x: number) => x % 2 === 1),
        ['a', 'c']
      );
    });
  });
});

Rhum.run();
