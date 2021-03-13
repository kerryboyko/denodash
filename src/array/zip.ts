const zip = (...arrays: any[][]) => {
  const output: any[] = [];
  for (let i = 0, l = arrays[0].length; i < l; i++) {
    output.push(arrays.map((array) => array[i]));
  }
  return output;
};

export default zip;
