import { generateFont, FontOptions, FontAlgorithm } from "./generators/font";
import { generateText, TextOptions, TextAlgorithm } from "./generators/text";
import {
  generateSymbol,
  SymbolOptions,
  SymbolAlgorithm,
} from "./generators/symbol";
import {
  generateImage,
  ImageOptions,
  ImageAlgorithm,
} from "./generators/image";
import {
  generateFingerprint,
  FingerprintOptions,
  FingerprintAlgorithm,
} from "./generators/fingerprint";

// Base interface for all options
export interface BaseGeneratorOptions {
  seed?: string | number;
}

// Generic type for generator functions
export type GeneratorFunction<TAlgorithm, TOptions, TResult> = (
  algorithm: TAlgorithm,
  opts?: BaseGeneratorOptions & TOptions
) => TResult;

const jibber = {
  font: generateFont as GeneratorFunction<
    FontAlgorithm,
    FontOptions,
    ReturnType<typeof generateFont>
  >,
  text: generateText as GeneratorFunction<
    TextAlgorithm,
    TextOptions,
    ReturnType<typeof generateText>
  >,
  symbol: generateSymbol as GeneratorFunction<
    SymbolAlgorithm,
    SymbolOptions,
    ReturnType<typeof generateSymbol>
  >,
  image: generateImage as GeneratorFunction<
    ImageAlgorithm,
    ImageOptions,
    ReturnType<typeof generateImage>
  >,
  fingerprint: generateFingerprint as GeneratorFunction<
    FingerprintAlgorithm,
    FingerprintOptions,
    ReturnType<typeof generateFingerprint>
  >,
};

export default jibber;
export const { font, text, symbol, image, fingerprint } = jibber;

export type {
  FontOptions,
  TextOptions,
  SymbolOptions,
  ImageOptions,
  FingerprintOptions,
  FontAlgorithm,
  TextAlgorithm,
  SymbolAlgorithm,
  ImageAlgorithm,
  FingerprintAlgorithm,
};
