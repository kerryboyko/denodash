
## partitionBy

#### import
```typescript
import partitionBy from "https://deno.land/x/denodash@0.1.2/src/array/partitionBy.ts"
```

#### signature
```typescript
partitionBy = <T>(
      fn: (val: T, i: number) => boolean,
      arr: T[],
    ): [T[], T[]]
```

Divides an array of elements into two seperate arrays. If fn(arr[index]) returns true, then arr[index] is placed in the first array in the returned tuple, otherwise it is placed in the second.

#### Source:

```typescript
export const partitionBy = <T>(
  fn: (val: T, i: number) => boolean,
  arr: T[],
): [T[], T[]] => {
  const trueArray: T[] = [];
  const falseArray: T[] = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    if (fn(arr[i], i)) {
      trueArray.push(arr[i]);
    } else {
      falseArray.push(arr[i]);
    }
  }
  return [trueArray, falseArray];
};

export default partitionBy;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("partitionBy()", () => {
    Rhum.testCase(
      "Should split values into two groups based on a given filter function",
      () => {
        Rhum.asserts.assertEquals(
          partitionBy((x: string) => x.charAt(0) === "b", [
            "beep",
            "boop",
            "foo",
            "bar",
          ]),
          [["beep", "boop", "bar"], ["foo"]],
        );
      },
    );
  });
```

  