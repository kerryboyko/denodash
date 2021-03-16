
## cartesianProduct

#### import
```typescript
import cartesianProduct from "https://deno.land/x/denodash@0.1.1/src/array/cartesianProduct.ts"
```

#### signature
```typescript
cartesianProduct = <T, U>(a: T[], b: U[]): [T, U][]
```

Takes two arrays of type T and type U respectively, and creates an array of tuple type [T, U] for every combination of the elements of a and b.

#### Source:

```typescript
export const cartesianProduct = <T, U>(a: T[], b: U[]): [T, U][] => {
  const output: [T, U][] = [];
  for (const aElem of a) {
    for (const bElem of b) {
      output.push([aElem, bElem]);
    }
  }
  return output;
};

export default cartesianProduct;
```

#### Test Examples: 

```typescript
  Rhum.testSuite("cartesianProduct()", () => {
    Rhum.testCase(
      "Should calculate the cartesian product of two arrays",
      () => {
        Rhum.asserts.assertEquals(cartesianProduct(["x", "y"], [1, 2]), [
          ["x", 1],
          ["x", 2],
          ["y", 1],
          ["y", 2],
        ]);
      },
    );
  });
```

  