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

const jibber = {
  font: (algorithm: FontAlgorithm, opts: FontOptions = {}) =>
    generateFont(algorithm, opts),
  text: (algorithm: TextAlgorithm, opts: TextOptions = {}) =>
    generateText(algorithm, opts),
  symbol: (algorithm: SymbolAlgorithm, opts: SymbolOptions = {}) =>
    generateSymbol(algorithm, opts),
  image: (algorithm: ImageAlgorithm, opts: ImageOptions = {}) =>
    generateImage(algorithm, opts),
  fingerprint: (
    algorithm: FingerprintAlgorithm,
    opts: FingerprintOptions = {}
  ) => generateFingerprint(algorithm, opts),
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
