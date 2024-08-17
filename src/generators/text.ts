// Text generator

import { BaseGeneratorOptions } from "../index";
import { SeededRandom } from "../utils/random";
import { LOREM_IPSUM, NIETZSCHE } from "./data/text";

export interface TextOptions extends BaseGeneratorOptions {
  length?: number;
  type?: "words" | "sentences" | "paragraphs";
  sampleText?: string;
}

export type TextAlgorithm = "lorem" | "nietzsche";

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

  generateText(length: number, rng: SeededRandom): string {
    let result = [];
    let currentWord = Array.from(this.chain.keys())[
      rng.nextInt(0, this.chain.size - 1)
    ];

    for (let i = 0; i < length; i++) {
      result.push(currentWord);
      const nextWords = this.chain.get(currentWord);
      if (!nextWords || nextWords.length === 0) {
        currentWord = Array.from(this.chain.keys())[
          rng.nextInt(0, this.chain.size - 1)
        ];
      } else {
        currentWord = nextWords[rng.nextInt(0, nextWords.length - 1)];
      }
    }

    return result.join(" ");
  }
}

export function generateText(
  algorithm: TextAlgorithm,
  opts: TextOptions = {}
): string {
  const rng = new SeededRandom(opts.seed || Date.now());
  const length = opts.length || 10;
  const type = opts.type || "words";
  const lookup = {
    lorem: LOREM_IPSUM,
    nietzsche: NIETZSCHE,
  };
  const sampleText = lookup[algorithm] || LOREM_IPSUM;
  const markovChain = new MarkovChain(sampleText);

  switch (type) {
    case "words":
      return markovChain.generateText(length, rng);
    case "sentences":
      const sentences = [];
      for (let i = 0; i < length; i++) {
        const sentenceLength = rng.nextInt(5, 10);
        sentences.push(markovChain.generateText(sentenceLength, rng));
      }
      return sentences.join(" ");
    case "paragraphs":
      return markovChain.generateText(length, rng);
    default:
      return markovChain.generateText(length, rng);
  }
}
