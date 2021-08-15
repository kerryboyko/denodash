export const sortByProperty = <T extends { [key: string]: any }>(
  array: T[],
  property: string,
): T[] | never =>
  array.slice().sort((a, b) => {
    if (typeof a[property] === "string") {
      return a[property].localeCompare(b[property]);
    } else {
      return a[property] - b[property];
    }
  });

export default sortByProperty;
