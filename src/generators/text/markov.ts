import { BaseOpts, JibberGenerator } from "../..";
import { SeededRandom } from "../../utils/random";
import { LOREM_IPSUM } from "./data";

export interface MarkovOptions extends BaseOpts {
  algorithm: "markov";
  words?: number;
  sentences?: number;
  paragraphs?: number;
  data?: string;
}

export const markov: JibberGenerator<MarkovOptions, string> = (opts) => {
  const { seed = "", words, sentences, paragraphs, data = LOREM_IPSUM } = opts;
  const chain = new MarkovChain(data);
  const rng = new SeededRandom(seed);

  const generateSentence = (wordCount: number): string => {
    const sentence = chain.generate(wordCount, rng);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  if (words) {
    return generateSentence(words);
  }

  if (sentences) {
    const generatedSentences = Array.from({ length: sentences }, () =>
      generateSentence(Math.floor(rng.next() * 10) + 5)
    );
    return generatedSentences.join(". ") + ".";
  }

  if (paragraphs) {
    const generatedParagraphs = Array.from({ length: paragraphs }, () => {
      const sentenceCount = Math.floor(rng.next() * 3) + 3;
      const paragraphSentences = Array.from({ length: sentenceCount }, () =>
        generateSentence(Math.floor(rng.next() * 10) + 5)
      );
      return paragraphSentences.join(". ") + ".";
    });
    return generatedParagraphs.join("\n\n");
  }

  // Default to generating one sentence if no specific option is provided
  return generateSentence(10);
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

  generate(length: number, rng: SeededRandom): string {
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
