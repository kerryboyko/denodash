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

### Authors & Contributors

Right now, this is a solo project of Brian Boyko. 