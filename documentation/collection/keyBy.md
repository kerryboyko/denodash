
## keyBy

#### import
```typescript
import keyBy from "https://deno.land/x/denodash@0.1.1/src/collection/keyBy.ts"
```

#### signature
```typescript
keyBy = <T extends Record<string, any>>(
      argument: Iteratee<T, string> | string,
      arr: T[],
    ): Record<string, T>
```

Creates an object composed of keys generated from the results of running each element of collection thru iteratee if a function is provide, or through (elem)=> elem[argument] if argument is a string. Input must be a Record (i.e., a key-value object with strings as keys)

#### Source:

```typescript
import type { Iteratee } from "../types/Iteratee.d.ts";

export const keyBy = <T extends Record<string, any>>(
  argument: Iteratee<T, string> | string,
  arr: T[],
): Record<string, T> => {
  const iter = typeof argument === "string"
    ? (x: T) => x[argument].toString()
    : argument;
  const output: Record<string, T> = {};
  for (const elem of arr) {
    const key = iter(elem).toString();
    output[key] = elem;
  }
  return output;
};

export default keyBy;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("keyBy()", () => {
    Rhum.testCase(
      "Creates an object composed of keys generated from the results of running each element of collection thru iteratee.",
      () => {
        interface Button {
          dir: string;
          code: number;
        }
        const testArray: Button[] = [
          { dir: "left", code: 97 },
          { dir: "right", code: 100 },
        ];
        Rhum.asserts.assertEquals(
          keyBy((x: Button) => String.fromCharCode(x.code), testArray),
          {
            a: { dir: "left", code: 97 },
            d: { dir: "right", code: 100 },
          },
        );
        Rhum.asserts.assertEquals(keyBy("dir", testArray), {
          left: { dir: "left", code: 97 },
          right: { dir: "right", code: 100 },
        });
      },
    );
  });
```

  