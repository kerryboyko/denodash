### type Comparator

Compatators compare two elements - a and b - and then returns true or false. For
example, `(a, b) => a < b` is a comparator.

#### Source:

```typescript
export type Comparator<T> = (a1: T, b1: T) => boolean;
```

#### Examples:

```typescript
const isSubstring: Comparator<string> = (a, b) => a.includes(b);
const isLessThan: Comparator<number> = (a, b) => a < b;
const isLonger: Comparator<Array<any>> = (a, b) => a.length > b.length;
const isFactor: Comparator<number> = (a, b) => b % a === 0;
```
