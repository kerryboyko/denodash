import flattenDepth from './flattenDepth.ts';

export const flatten = (arr: any[]) => flattenDepth(arr, 1);

export default flatten;