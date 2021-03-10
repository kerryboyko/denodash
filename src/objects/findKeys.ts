import type {Predicate} from '../types/Predicate.d.ts'

export const findKeys = (obj: Record<string, any>, predicate: Predicate<any>): string[] => {
  let output: string[] = [];
  for(let key in obj){
    if(predicate(obj[key])){
      output.push(key)
    }
  }
  return output.sort();
}

export default findKeys;