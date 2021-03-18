
## overArgs

#### import
```typescript
import overArgs from "https://deno.land/x/denodash@0.1.1/src/function/overArgs.ts"
```

#### signature
```typescript
overArgs = (
      fn: Function,
      mapFuncs: Function[],
      ...args: any[]
    ): any
```

Maps the arguments (args) through the mapping functions (mapFuncs) and is then passed to fn and returns the result of fn with the mapped arguments

#### Source:

```typescript
export const overArgs = (
  fn: Function,
  mapFuncs: Function[],
  ...args: any[]
): any =>
  fn(
    ...args.map((arg: any, i: number) =>
      mapFuncs[i] === undefined ? arg : mapFuncs[i](arg)
    ),
  );

export default overArgs;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("overArgs()", () => {
    Rhum.testCase("invokes func with its arguments transformed.", () => {
      const double = (n: number): number => n * 2;
      const square = (n: number): number => n * n;

      Rhum.asserts.assertEquals(
        overArgs((x: number, y: number) => [x, y], [square, double], 9, 3),
        [81, 6],
      );
      Rhum.asserts.assertEquals(
        overArgs((x: number, y: number) => [x, y], [square, double], 10, 5),
        [100, 10],
      );
    });
  });
```

  