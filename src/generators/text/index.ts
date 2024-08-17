import { markov, MarkovOptions } from "./markov";
import { alphaChars, AlphaCharsOptions } from "./alphaChars";

export type TextOptions = MarkovOptions | AlphaCharsOptions;

export const generateText = (opts: TextOptions): string => {
  switch (opts.algorithm) {
    case "markov":
      return markov(opts);
    case "alphaChars":
      return alphaChars(opts);
    default:
      throw new Error(`Unsupported algorithm: ${(opts as any).algorithm}`);
  }
};

export type { MarkovOptions, AlphaCharsOptions };
