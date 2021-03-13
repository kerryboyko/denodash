import chunk from "./chunk.ts";

export const chunkIntoParts = <T>(arr: T[], parts = 1): T[][] => {
  const size = Math.ceil(arr.length / parts);
  return chunk(arr, size);
};

export default chunkIntoParts;
