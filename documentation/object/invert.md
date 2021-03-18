
## invert

#### import
```typescript
import invert from "https://deno.land/x/denodash@0.1.2/src/object/invert.ts"
```

#### signature
```typescript
invert = (obj: Record<string, any>): Record<string, string>
```

Inverts the keys and values of the record provided. Throws an error if any value is not serializable to a string

#### Source:

```typescript
const stringifyKey = (k: any, e: string): string | never => {
  if (typeof k === "string") {
    return k;
  }
  if (typeof k.toString === "function") {
    return k.toString();
  }
  try {
    return JSON.stringify(k);
  } catch (err) {
    throw new TypeError(`${e}:${err}`);
  }
};

export const invert = (obj: Record<string, any>): Record<string, string> =>
  Object.entries(obj).reduce(
    (pv: Record<string, string>, [k, v]: [string, any]) => ({
      ...pv,
      [
        stringifyKey(
          v,
          `Value of property ${k} is not serializable to string`,
        )
      ]: k,
    }),
    {},
  );

export default invert;

```

#### Test Examples: 

```typescript
  Rhum.testSuite("invert()", () => {
    Rhum.testCase("should invert an objects keys and values", () => {
      Rhum.asserts.assertEquals(
        invert({ Moe: "Moses", Larry: "Louis", Curly: "Jerome" }),
        { Moses: "Moe", Louis: "Larry", Jerome: "Curly" },
      );
    });
  });
```

  