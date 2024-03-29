## countBy

#### import

```typescript
import countBy from "https://deno.land/x/denodash@0.1.3/src/collection/countBy.ts";
```

#### signature

```typescript
countBy = <T>(
      iteratee: Iteratee<T, any>,
      arr: T[],
    ): Record<string, number>
```

Runs each element through a iteratee, and returns a count of how many times the
result occurs. Returns Record<element as string, number> count of results

#### Source:

```typescript
import type { Iteratee } from "../types/Iteratee.d.ts";

export const countBy = <T>(
  iteratee: Iteratee<T, any>,
  arr: T[],
): Record<string, number> => {
  const output: Record<string, number> = {};
  for (const elem of arr) {
    const key = iteratee(elem).toString();
    output[key] = output[key] === undefined ? 1 : output[key] + 1;
  }
  return output;
};

export default countBy;
```

#### Test Examples:

```typescript
Rhum.testSuite("countBy()", () => {
  Rhum.testCase(
    "Should create an object composed of keys generated by running each element of collection through the iteratee",
    () => {
      Rhum.asserts.assertEquals(countBy(Math.floor, [6.1, 4.2, 6.3]), {
        "4": 1,
        "6": 2,
      });
      Rhum.asserts.assertEquals(
        countBy((elem: string) => elem.length, ["one", "two", "three"]),
        { "3": 2, "5": 1 },
      );
      Rhum.asserts.assertEquals(
        countBy(identity, ["foo", "bar", "foo", "bar", "foo", "baz"]),
        { bar: 2, baz: 1, foo: 3 },
      );
    },
  );
});
```
