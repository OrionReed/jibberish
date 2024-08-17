import { BaseOpts, JibberGenerator } from "../..";
import { SeededRandom } from "../../utils/random";
import { LOREM_IPSUM, NIETZSCHE } from "./data";

const source = {
  lorem: LOREM_IPSUM,
  nietzsche: NIETZSCHE,
};

export interface MarkovOptions extends BaseOpts {
  algorithm: "markov";
  type: "word" | "sentence" | "paragraph";
  length: number;
  data: keyof typeof source;
}

export const markov: JibberGenerator<MarkovOptions, string> = (opts) => {
  const { type, seed, length, data = "lorem" } = opts;
  const chain = new MarkovChain(source[data]);

  // just sentences for now
  return chain.generateText(length, String(seed));
};

class MarkovChain {
  private chain: Map<string, string[]> = new Map();

  constructor(sampleText: string) {
    this.buildChain(sampleText);
  }

  private buildChain(text: string) {
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length - 1; i++) {
      const currentWord = words[i];
      const nextWord = words[i + 1];
      if (!this.chain.has(currentWord)) {
        this.chain.set(currentWord, []);
      }
      this.chain.get(currentWord)!.push(nextWord);
    }
  }

  generateText(length: number, seed: string): string {
    const rng = new SeededRandom(seed);
    const startWord = Array.from(this.chain.keys())[
      Math.floor(rng.next() * this.chain.size)
    ];
    let result = [startWord];
    for (let i = 1; i < length; i++) {
      const prevWord = result[i - 1];
      const nextWords = this.chain.get(prevWord) || [];
      if (nextWords.length === 0) break;
      result.push(nextWords[Math.floor(rng.next() * nextWords.length)]);
    }
    return result.join(" ");
  }
}
