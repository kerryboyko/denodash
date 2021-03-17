### type Iteratee

Iteratees are functions which can be used to iterate over elements in a
function. This is no different from a regular function, really, but having it
specified helps with typechecking.

#### Source:

```typescript
export type Iteratee<T, U> = (x: T) => U;
```

#### Examples:

```typescript
const square: Iteratee<number, number> = (x) => x * x;
const countLetters: Iteratee<string, number> => (x) => x.length;
const fizzbuzz: Iteratee<number, number | string> => (x) => {
  if(x % 15 === 0){
    return 'FizzBuzz!'
  } 
  if(x % 5 === 0){
    return 'Fizz'
  }
  if(x % 3 === 0){
    return 'Buzz'
  }
  return x;
}
```
