### type ValueOrArray

A recursive type (only available in Typescript 3.6 or laters), ValueOrArray is a
type that is either a value of type T, or an array of type T or arrays of type
T.

#### Source:

```typescript
export type ValueOrArray<T> = T | Array<ValueOrArray<T>>;
```

#### Examples:

```typescript
const people: ValueOrArray<string> = [
  "billy",
  "geofrey",
  "ann",
  ["betty-sue", "betty-may", "betty-foo", ["betty-clone1", "betty-clone2"]],
  "darren",
  ["other-darren", "darren-three"],
];
```
