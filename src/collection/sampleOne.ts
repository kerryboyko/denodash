import randomOf from "../utils/randomOf.ts";

export const sampleOne = <T>(array: T[]): T => array[randomOf(array.length)];

export default sampleOne;
