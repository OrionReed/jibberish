// Text generator

import { SeededRandom } from "../utils/random";

export interface TextOptions {
  length?: number;
}

export type TextAlgorithm = "lorem" | "pseudolang";

export function generateText(
  algorithm: TextAlgorithm,
  opts: TextOptions = {}
): string {
  const rng = new SeededRandom(opts.seed || Date.now());
  const length = opts.length || 10;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters[rng.nextInt(0, characters.length - 1)];
  }
  return result;
}
