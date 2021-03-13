export const pick = (
  obj: Record<string | number, any>,
  props: Array<string | number>,
): Record<string | number, any> => {
  const newObj: Record<string | number, any> = {};
  for (let prop of props) {
    if (obj[prop] !== undefined) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
};

export default pick;
