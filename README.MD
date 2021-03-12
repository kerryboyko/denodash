# DenoDash

## A Typescript-First utility library for Deno
### Why yet another utility library? 

I'll be honest, I *love* Lodash in my node projects.  Even though I could implment many of the features myself, it's just convenient to have it all in a simple package that is pretty standard.  But it's not without it's flaws, especially when going from Node to Deno. 

Lodash was designed in a EMCA 3 kind of world, where things such as "filter" and "slice" were not yet part of the official Javascript prototype. Moving forward, there are a lot of utilities that a utility library can omit.  Do we really need _.last when we can just write arr[arr.length - 1]? Or _.compact when we can just write arr.filter(x => !!x)? 

Instead of importing Lodash into the new Deno ecosystem, I thought it was a good idea to write a new utility library - one designed from the ground up to work in the deno paradigm. 

### Goals of the project

* Every function can be imported independently, meaning that you don't need to download the whole package for one utility.  Just need "get"? Just get "get"!
* Full Typescript Support including generics. While generics are an advanced Typescript topic, the use of generics in a utility library will help with typechecking going forward and prevent nasty errors.  
* Only provide what is missing from the core. Functions that can be trivially implmented or are already part of the prototype should be omitted; conversely, helpful utilities not available in other libraries might have a home here. 
* Functional by design - while not strictly written to FP paradigms, no utility should ever mutate a parameter passed to it, returning only new variables. This doesn't mean that mutations aren't used in the utility itself, just that these functions will never change your inputs.  
* Utility Types as well as utility functions - some function and object constructions are common enough that they can be implemented as named types. Comparator, Iteratee, Predicate, etc. These types are provided to extend the functionality of Typescript's already good library of utility types (Partial, Required, et. al)
### The use of curries for composition

A pattern that I found in Lodash was often that the library offered many functions ending with the suffix "-by" or "-with" that took a function as the last parameter, iterating over the arguments provided until it hit a function.  This made a lot of sense in the days before spread operators, but it seemed to me that it would be better to put the function first... or *even better*, create a curried function. 

For example, lodash's "intersectionBy" has the following syntax and examples: 

```javascript
// _.intersectionBy([arrays], [iteratee=_.identity])
_.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [2.1];
```

To me, it seemed like a better way to handle this would be: 

```typescript
// const intersectionBy = <T>(fn: Iteratee<T, any>) => (...arrays: T[][]): T[]
// or without the generics:
// intersectionBy = (fn: Function) => (...arrays: Array<Array<any>>) => Array<any>)
intersectionBy(Math.floor)([2.1, 1.2], [2.3, 3.2])
// => [2.1]
```

This has the added advantage of being able to define different functions for reuse in your code. 

```typescript
const arr1 = [2.1, 1.2];
const arr2 = [2.3, 3.2];
const intersectionByFloor = intersectionBy(Math.floor);
const intersectionByDecimal = intersectionBy(
  (x: number) => Math.round((x * 10) - (Math.floor(x) * 10))
);
intersectionByFloor(arr1, arr2); // => [2.1];
intersectionByDecimal(arr1, arr2); // => [1.2];
```

All in all, the currying syntax was chosen in these cases primarily to provide code reuse - instead of having seperate "intersection" and "intersectionBy" functions, we can simply define "intersection" as the result of intersectionBy when passed an identity function (x => x); 

## Methods: 
### Currently Supported: 

* array
  * cartesianProduct
  * chunk
  * chunkIntoParts
  * difference
  * differenceBy
  * differenceWith
  * dropWhile
  * dropWhileRight
  * findLastIndex
  * flatten
  * flattenDeep
  * flattenDepth
  * fromPairs
  * intersection
  * intersectionBy
  * intersectionWith
  * lastIndexOf
  * partition
  * partitionBy
  * shank - like Array.prototype.splice, but returns a new array rather than mutating the old one. 
  * union
  * unionBy
  * unionWith
  * uniq
  * uniqBy
  * uniqWith
  * unzip
  * xor
  * zip
* collection
  * count
  * countBy
  * flatMapDeep
  * flatMapDepth
  * groupBy
  * keyBy
  * sample
  * sampleOne
  * shuffle
  * sortBy
* function
  * after
  * before
  * debounce
  * defer
  * memoize
  * once
  * overArgs
  * throttle
* lang
  * cloneDeep
  * isEqual
* objects
  * findKeys
  * get
  * invert
  * mapObject
  * omit
  * pick
* types
  * type Comparator
  * type Iteratee
  * type ObjectKey
  * type Predicate
  * type SortComparator
  * type Transformer
  * type ValueOrArray
* utils
  * comparatorChain
  * delay
  * identity
  * mergeSort
  * randomOf



## Authors & Contributors

Right now, this is a solo project of Brian Boyko. 