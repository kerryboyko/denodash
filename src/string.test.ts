import { Rhum } from "../testing_deps.ts";

import deburr from "./string/deburr.ts";
import {COMBO_MARKS} from './string/constants/burredLetters.ts';

const LATIN_UNICODE = `ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ`;

const DEBURRED_LU = `AAAAAAAeCEEEEIIIIDNOOOOOOUUUUYThssaaaaaaaeceeeeiiiidnoooooouuuuythyAaAaAaCcCcCcCcDdDdEeEeEeEeEeGgGgGgGgHhHhIiIiIiIiIiIJijJjKkkLlLlLlLlLlNnNnNn'nNnOoOoOoOeoeRrRrRrSsSsSsSsTtTtTtUuUuUuUuUuUuWwYyYZzZzZzs`;
const OPERATORS = ["×", "÷"];
/** List of combining diacritical marks. */


Rhum.testPlan("string/*", () => {
  Rhum.testSuite("deburr()", () => {
    Rhum.testCase("should convert Latin Unicode letters to basic Latin", () => {
      Rhum.asserts.assertStrictEquals(deburr(LATIN_UNICODE), DEBURRED_LU);
    });
    Rhum.testCase("should not deburr Latin mathematical operators", () => {
      console.log(OPERATORS);

      Rhum.asserts.assertEquals(OPERATORS.map(deburr), OPERATORS);
    });
    Rhum.testCase("should deburr combining diacritical marks", () => {
      Rhum.asserts.assertStrictEquals(deburr(COMBO_MARKS), "");
    });
  });
});

Rhum.run();
