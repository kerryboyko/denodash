import BURRED_LETTERS from "./constants/burredLetters.ts";

const regexLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

const rsComboMarksRange = "\\u0300-\\u036f";
const reComboHalfMarksRange = "\\ufe20-\\ufe2f";
const rsComboSymbolsRange = "\\u20d0-\\u20ff";
const rsComboRange = rsComboMarksRange
  .concat(reComboHalfMarksRange)
  .concat(rsComboSymbolsRange);

const reComboMark = RegExp(`[${rsComboRange}]`, "g");

export const deburr = (source: string): string =>
  source
    .replace(regexLatin, (char: string) => BURRED_LETTERS[char])
    .replace(reComboMark, "");

export default deburr;