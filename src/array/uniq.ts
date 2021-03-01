import identity from '../utils/identity.ts';
import unionBy from './unionBy.ts';

export const uniq = <T>(arr: T[]): T[] => unionBy(identity, arr);

export default uniq;