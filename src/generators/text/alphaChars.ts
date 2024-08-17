import { BaseOpts, JibberGenerator } from "../..";
import { SeededRandom } from "../../utils/random";
import { LOREM_IPSUM, NIETZSCHE } from "./data";

export interface AlphaCharsOptions extends BaseOpts {
  algorithm: "alphaChars";
  length: number;
}

export const alphaChars: JibberGenerator<AlphaCharsOptions, string> = (
  opts
) => {
  const { length, seed = 0 } = opts;
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const random = new SeededRandom(seed);

  return Array.from(
    { length },
    () => chars[random.nextInt(0, chars.length - 1)]
  ).join("");
};
