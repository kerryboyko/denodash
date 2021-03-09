export const before = (n: number, fn: Function) => {
  let count = 0;
  return (...args: any[]): void | any => {
    if(count < n){
      count += 1;
      return fn(...args);
    }
  }
}

export default before;