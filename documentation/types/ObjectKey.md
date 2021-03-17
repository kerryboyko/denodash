### type ObjectKey

ObjectKeys are shorthand for a valid object key, specifically that used in a
record: the union of string | number | symbol.

#### Source:

```typescript
export type ObjectKey = string | number | symbol;
```

#### Examples:

```typescript
const symbolOne = new Symbol();
const complexObj: Record<ObjectKey, any> = {};
enum SpelledOut = {
  FOUR = 'FOUR'
}
enum Implied = {
  FIVE
}
complexObj[symbolOne] = 1;
complexObj.keyTwo = 2;
complexObj[3] = 3;
complexObj[SpelledOut.FOUR] = 4;
complexObj[Implied.FIVE] = 5;
```
