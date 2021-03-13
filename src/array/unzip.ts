import zip from "./zip.ts";

const unzip = (arrays: any[][]): any[][] => zip(...arrays);

export default unzip;
