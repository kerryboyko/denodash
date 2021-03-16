import flattenDepth from "./flattenDepth.ts";

export const flatten = (arr: any[]): any[] => flattenDepth(arr, 1);

export default flatten;
