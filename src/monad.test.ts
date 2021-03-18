import { Rhum } from "../testing_deps.ts";
import monad from "./monad/monad.ts";

Rhum.testPlan("monad", () => {
  Rhum.testSuite("monad()", () => {
    Rhum.testCase("is a monad", () => {
      Rhum.asserts.assertEquals(typeof monad, 'function')
    });
  });
});

Rhum.run();
