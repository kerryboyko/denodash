import intersection from './intersection.ts';

export const xor = (...arrays: any[][]) => {
  const intersections = new Set(intersection<any>(...arrays));
  return ([] as any[]).concat(...arrays).filter((elem) => !intersections.has(elem));
}

export default xor;