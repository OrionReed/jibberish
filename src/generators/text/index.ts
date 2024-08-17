import { markov, MarkovOptions } from "./markov";
import { AlphaCharsOptions } from "./alphaChars";

export type TextOptions = MarkovOptions | AlphaCharsOptions;

export const generateText = (opts: TextOptions): string => {
  switch (opts.algorithm) {
    case "markov":
      return markov(opts);
    default:
      throw new Error(`Unsupported algorithm: ${(opts as any).algorithm}`);
  }
};

export type { MarkovOptions, AlphaCharsOptions };
