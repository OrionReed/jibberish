import { generateFont, FontOptions, FontResult } from "./generators/font";
import { generateText, TextOptions } from "./generators/text";
import { generateSymbol, SymbolOptions } from "./generators/symbol";
import { generateImage, ImageOptions, ImageResult } from "./generators/image";
import {
  generateFingerprint,
  FingerprintOptions,
} from "./generators/fingerprint";

export interface BaseOpts {
  type: string;
  seed?: string | number;
}

export type JibberGenerator<T extends BaseOpts, R> = (opts: T) => R;

type JibberFunction<T extends BaseOpts, R> = JibberGenerator<T, R> & {
  types: readonly string[];
};

function createJibberFunction<T extends BaseOpts, R>(
  generate: JibberGenerator<T, R>,
  types: readonly string[]
): JibberFunction<T, R> {
  const jibberFn = generate as JibberFunction<T, R>;
  jibberFn.types = types;
  return jibberFn;
}

const jibber = {
  font: createJibberFunction(generateFont, ["basic", "advanced"]),
  text: createJibberFunction(generateText, ["markov", "alphaChars"]),
  symbol: createJibberFunction(generateSymbol, ["basic", "complex"]),
  image: createJibberFunction(generateImage, ["pixel", "vector"]),
  fingerprint: createJibberFunction(generateFingerprint, ["basic", "advanced"]),
} as const;

export default jibber;
export const { font, text, symbol, image, fingerprint } = jibber;

export type {
  FontOptions,
  FontResult,
  TextOptions,
  SymbolOptions,
  ImageOptions,
  ImageResult,
  FingerprintOptions,
};
