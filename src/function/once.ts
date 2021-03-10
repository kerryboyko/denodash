import before from './before.ts';

export const once = (fn: Function) => before(1, fn); 

export default once;