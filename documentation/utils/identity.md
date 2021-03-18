## identity

#### import

```typescript
import identity from "https://deno.land/x/denodash@0.1.1/src/utils/identity.ts";
```

#### signature

```typescript
identity = <T>(x: T): T
```

A function which returns the value passed in as a parameter. (Useful as a
default function)

#### Source:

```typescript
export const identity = <T>(x: T): T => x;

export default identity;
```

#### Test Examples:

```typescript
Rhum.testSuite("identity()", () => {
  Rhum.testCase("returns what is passed to it.", () => {
    Rhum.asserts.assertStrictEquals(identity(0), 0);
    Rhum.asserts.assertStrictEquals(identity(42), 42);
    Rhum.asserts.assertStrictEquals(identity("foo"), "foo");
    const referenceToArray = [1, 2, 3];
    Rhum.asserts.assertEquals(identity(referenceToArray), referenceToArray);
    Rhum.asserts.assertStrictEquals(
      identity(referenceToArray),
      referenceToArray,
    );
  });
});
```
