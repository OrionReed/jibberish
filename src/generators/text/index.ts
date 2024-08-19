import { markov, MarkovOptions } from "./markov";

export type TextOptions = MarkovOptions;

export const generateText = (opts: TextOptions): string => {
  switch (opts.type) {
    case "markov":
      return markov(opts);
    default:
      throw new Error(`Unsupported jibberish type: ${(opts as any).type}`);
  }
};

export type { MarkovOptions };
