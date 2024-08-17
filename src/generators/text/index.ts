import { markov, MarkovOptions } from "./markov";

export type TextOptions = MarkovOptions;

export const generateText = (opts: TextOptions): string => {
  switch (opts.algorithm) {
    case "markov":
      return markov(opts);
    default:
      throw new Error(`Unsupported algorithm: ${(opts as any).algorithm}`);
  }
};

export type { MarkovOptions };
