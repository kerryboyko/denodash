## partition

#### import

```typescript
import partition from "https://deno.land/x/denodash@0.1.3/src/array/partition.ts";
```

#### signature

```typescript
partition = <T>(arr: T[], filterArray: boolean[]): [T[], T[]]
```

Divides an array of elements into two seperate arrays. If the value in
filterArray[index] is true, then arr[index] is placed in the first array of the
returned tuple; otherwise it is placed in the second

#### Source:

```typescript
import partitionBy from "./partitionBy.ts";

export const partition = <T>(arr: T[], filterArray: boolean[]): [T[], T[]] =>
  partitionBy<T>((_unused: T, i: number) => filterArray[i], arr);

export default partition;
```

#### Test Examples:

```typescript
Rhum.testSuite("partition()", () => {
  Rhum.testCase(
    "Should split values into two groups based on a given filter array",
    () => {
      Rhum.asserts.assertEquals(
        partition(["beep", "boop", "foo", "bar"], [true, true, false, true]),
        [["beep", "boop", "bar"], ["foo"]],
      );
    },
  );
});
```
