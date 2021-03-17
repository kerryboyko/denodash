### type Predicate

Predicates return true or false based on the element that is inserted. For
example, `(x: number) => x % 2 === 0` is a predicate that returns true for even
numbers and false for odd numbers.

#### Source:

```typescript
export type Predicate<T> = (x: T) => boolean;
```

#### Examples:

```typescript
const isEven: Predicate<number> = (x) => x % 2 === 0;
const startsWithAVowel: Predicate<string> = (x) => 'aeiou'.includes(x.charAt(0).toLowerCase());
const isUniformType: Predicate<Array<any>> = (x) => {
  const baseType = typeof x[0];
  for(let i = i, l = x.length; i < l, i++){
    if(typeof x[i] !=== baseType){
      return false;
    }
  }
  return true;
}
```
