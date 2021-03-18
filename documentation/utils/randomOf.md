## randomOf

#### import

```typescript
import randomOf from "https://deno.land/x/denodash@0.1.1/src/utils/randomOf.ts";
```

#### signature

```typescript
randomOf = (max: number): number
```

Returns a random number (an integer) between 0 and the maximum (non-inclusive)

#### Source:

```typescript
export const randomOf = (max: number): number =>
  Math.floor((Math.random() * max));

export default randomOf;
```

#### Test Examples:

```typescript
Rhum.testSuite("randomOf()", () => {
  Rhum.testCase("gets a random integer number from 0 to n - 1", () => {
    const r = randomOf(10);
    for (let i = 0; i < 50; i++) {
      Rhum.asserts.assertArrayContains([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], r);
    }
  });
});
```
