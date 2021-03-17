### type SortComparator

SortCompatators compare two elements - a and b - and then a number (usually a
positive, negative, or 0 integer). They are most often used for sorting.

#### Source:

```typescript
export type SortComparator<T> = (a1: T, b1: T) => number;
```

#### Examples:

```typescript
const ascending: SortComparator<number> = (a, b) => a - b;
const decending: SortComparator<number> = (a, b) => b - a;
interface Person {
  name: string;
  age: number;
}
const firstByAgeThenByName: SortComparator<Person> = (personA, personB) => {
  const diffInAge = personA.age - personB.age;
  if (diffInAge !== 0) {
    return diffInAge;
  }
  const nameA = personA.name.toUpperCase();
  const nameB = personB.name.toUpperCase();
  if (nameA === nameB) {
    return 0;
  }
  return textA < textB ? -1 : 1;
};
```
