// Font generator

import { SeededRandom } from "../utils/random";

export interface FontOptions {
  // Add any specific options for fonts
}

export interface FontDetails {
  name: string;
  url: string;
}

export type FontAlgorithm = "basic" | "extended" | "arrows";

export function generateFont(
  algorithm: FontAlgorithm,
  opts: FontOptions = {}
): FontDetails {
  const rng = new SeededRandom(opts.seed || Date.now());
  const fontNames = [
    "GibberishSans",
    "NonsenseSerif",
    "BabbleScript",
    "JargonMono",
  ];
  const randomName = fontNames[rng.nextInt(0, fontNames.length - 1)];
  return {
    name: randomName,
    url: `https://example.com/fonts/${randomName.toLowerCase()}.woff2`,
  };
}
