// Symbol generator

import { SeededRandom } from "../utils/random";

export type ImageAlgorithm = "user" | "pattern" | "text";

export interface ImageOptions {
  // Add any specific options for symbols
}

export function generateImage(
  algorithm: ImageAlgorithm,
  opts: ImageOptions = {}
): string {
  const rng = new SeededRandom(algorithm);

  switch (algorithm) {
    case "user":
      return generateUserImage(rng);
    case "pattern":
      return generatePattern(rng);
    case "text":
      return generateTextImage(rng);
    default:
      throw new Error(`Unknown image algorithm: ${algorithm}`);
  }
}

function generateUserImage(rng: SeededRandom): string {
  throw new Error("User image generation is not implemented");
}
function generatePattern(rng: SeededRandom): string {
  throw new Error("Pattern image generation is not implemented");
}
function generateTextImage(rng: SeededRandom): string {
  throw new Error("Text image generation is not implemented");
}
