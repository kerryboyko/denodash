import { Rhum } from "../testing_deps.ts";

import cloneDeep from './lang/cloneDeep.ts';
/** List of combining diacritical marks. */


Rhum.testPlan("lang/*", () => {
  Rhum.testSuite("cloneDeep()", () => {
    Rhum.testCase("should create a deep clone of an object", () => {
      const testObj = {
        a: {
          b: {
            c: "foo"
          }
        },
        d: {
          e: {
            f: "bar"
          }
        }
      }
      const testClone = cloneDeep(testObj);
      Rhum.asserts.assertStrictEquals(testObj.a.b.c, testClone.a.b.c);
      Rhum.asserts.assertEquals(testObj, testClone);
      Rhum.asserts.assertNotStrictEquals(testObj, testClone);
      Rhum.asserts.assertEquals(testObj.a, testClone.a);
      Rhum.asserts.assertNotStrictEquals(testObj.a, testClone.a);

    });

  });
});

Rhum.run();
