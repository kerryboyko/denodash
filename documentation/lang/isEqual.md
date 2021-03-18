
## isEqual

#### import
```typescript
import isEqual from "https://deno.land/x/denodash@0.1.2/src/lang/isEqual.ts"
```

#### signature
```typescript
isEqual = Comparator<any> // i.e., (a: any, b: any) => boolean
```

Determines if the value of a and b are equal, even if the references are not equal. 

#### Source:

```typescript
import type { Comparator } from "../types/Comparator.d.ts";

const isEqual: Comparator<any> = (a, b) => {
  const typeA = typeof a;
  const typeB = typeof b;
  if (typeA !== typeB) {
    return false;
  }
  /* JS says NaN !== NaN, but we want that to return true for this function. */
  if (Number.isNaN(a)) {
    return Number.isNaN(b);
  }

  // primatives
  if (
    [
      "string",
      "number",
      "boolean",
      "string",
      "bigint",
      "symbol",
      "undefined",
      "function",
    ].includes(typeA)
  ) {
    return a === b;
  }
  // arrays
  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0, l = a.length; i < l; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  // objects
  if (typeA === "object") {
    if (a === null) {
      return b === null;
    }
    const aEntries = Object.entries(a);
    const bEntries = Object.entries(b);
    return isEqual(aEntries, bEntries);
  }
  throw new Error(
    `You've tried running isEqual on something isEqual isn't meant for`,
  );
};

export default isEqual;

```

#### Test Examples: 

```typescript
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
```

  