export const defer = (fn: Function, ...args: any[]):void => {
  setTimeout(() => fn(...args), 0);
}

export default defer;