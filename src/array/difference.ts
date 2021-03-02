import differenceBy from './differenceBy.ts'
import identity from '../utils/identity.ts'

export const difference = differenceBy(identity);

export default difference;