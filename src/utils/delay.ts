export const delay = (time: number, fn?: Function, ...args: any[]) =>
  new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(fn ? fn(...args) : undefined);
    }, time);
  });

export default delay;
