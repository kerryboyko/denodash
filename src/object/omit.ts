import pick from "./pick.ts";

export const omit = (
  obj: Record<string | number, any>,
  props: Array<string | number>
): Record<string | number, any> => {
  const getProps = Object.keys(obj).filter(
    (p: string | number) => !props.includes(p)
  );
  return pick(obj, getProps);
};

export default omit;
