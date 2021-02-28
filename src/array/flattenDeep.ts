import flattenDepth from './flattenDepth.ts';

export const flattenDeep = (arr: any[]) =>
  flattenDepth(arr, Number.MAX_SAFE_INTEGER);

export default flattenDeep;