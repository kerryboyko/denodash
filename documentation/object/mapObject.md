## mapObject

#### import

```typescript
import mapObject from "https://deno.land/x/denodash@0.1.3/src/object/mapObject.ts";
```

#### signature

```typescript
mapObject = <T, U>(
      obj: Record<ObjectKey, T>,
      iteratee: Iteratee<T, U>,
    ): Record<ObjectKey, U>
```

Maps over the object in a record and returns a new record with the results of
that function on the same keys. Execution order is not guaranteed.

#### Source:

```typescript
import type { ObjectKey } from "../types/ObjectKey.d.ts";
import type { Iteratee } from "../types/Iteratee.d.ts";

export const mapObject = <T, U>(
  obj: Record<ObjectKey, T>,
  iteratee: Iteratee<T, U>,
): Record<ObjectKey, U> =>
  Object.entries(obj).reduce(
    (pv: Record<ObjectKey, U>, [k, v]: [ObjectKey, T]) => ({
      ...pv,
      [k]: iteratee(v),
    }),
    {},
  );

export default mapObject;
```

#### Test Examples:

```typescript
Rhum.testSuite("mapObject()", () => {
  Rhum.testCase("should map an object", () => {
    const testObj = {
      one: 1,
      two: 2,
      three: 3,
    };
    const returned = mapObject<number, string>(
      testObj,
      (n: number): string => (n * n * 100).toString(),
    );
    Rhum.asserts.assertEquals(returned, {
      one: "100",
      two: "400",
      three: "900",
    });
  });
});
```
