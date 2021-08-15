## unzip

#### import

```typescript
import unzip from "https://deno.land/x/denodash@0.1.3/src/array/unzip.ts";
```

#### signature

```typescript
unzip = (arrays: any[][]): any[][]
```

accepts an array of grouped elements and creates an array regrouping the
elements to their pre-zip configuration.

#### Source:

```typescript
import zip from "./zip.ts";

const unzip = (arrays: any[][]): any[][] => zip(...arrays);

export default unzip;
```

#### Test Examples:

```typescript
Rhum.testSuite("unzip()", () => {
  Rhum.testCase("should unzip", () => {
    Rhum.asserts.assertEquals(
      unzip([
        ["a", 1, true],
        ["b", 2, false],
      ]),
      [
        ["a", "b"],
        [1, 2],
        [true, false],
      ],
    );
  });
});
```
