## sortByProperty

#### import

```typescript
import sortByProperty from "https://deno.land/x/denodash@0.1.3/src/collection/sortByProperty.ts";
```

#### signature

```typescript
sortByProperty = <T extends { [key: string]: any }>(
      array: T[],
      property: string,
    ): T[] | never
```

Returns a copy of the array provided, sorted by the value of a key provided

#### Source:

```typescript
export const sortByProperty = <T extends { [key: string]: any }>(
  array: T[],
  property: string,
): T[] | never =>
  array.slice().sort((a, b) => {
    if (typeof a[property] === "string") {
      return a[property].localeCompare(b[property]);
    } else {
      return a[property] - b[property];
    }
  });

export default sortByProperty;
```

#### Test Examples:

```typescript
Rhum.testSuite("sortByProperty()", () => {
  Rhum.testCase(
    "sorts the order of the iteratees by a string provided",
    () => {
      type TestType = { user: string; age: number };
      const testArray: TestType[] = [
        { user: "fred", age: 48 },
        { user: "barney", age: 34 },
        { user: "fred", age: 40 },
        { user: "barney", age: 36 },
      ];
      Rhum.asserts.assertEquals(sortByProperty(testArray, "age"), [
        { user: "barney", age: 34 },
        { user: "barney", age: 36 },
        { user: "fred", age: 40 },
        { user: "fred", age: 48 },
      ]);
      Rhum.asserts.assertEquals(sortByProperty(testArray, "user"), [
        { user: "barney", age: 34 },
        { user: "barney", age: 36 },
        { user: "fred", age: 48 },
        { user: "fred", age: 40 },
      ]);
    },
  );
});
```
