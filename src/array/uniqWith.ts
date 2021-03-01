import type {Comparator} from '../types/Comparator.d.ts';
import unionWith from './unionWith.ts';

export const uniqBy = <T>(comparator: Comparator<T>, arr: T[]): T[] => unionWith(comparator, arr);

export default uniqBy;