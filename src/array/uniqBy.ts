import type {Iteratee} from '../types/Iteratee.d.ts';
import unionBy from './unionBy.ts';

export const uniqBy = <T>(iteratee: Iteratee<T>, arr: T[]): T[] => unionBy<T>(iteratee, arr);

export default uniqBy;