import { Test } from ".";
import {
  FontOptions,
  TextOptions,
  SymbolOptions,
  ImageOptions,
  FingerprintOptions,
  FontResult,
} from "../src";
import { NIETZSCHE } from "../src/generators/text/data";

export const fontTest: Test<FontOptions, FontResult> = {
  name: "font",
  output: (result) => `
    <div style="font-family: '${result.fontFamily}'; font-size: ${result.size}px; font-weight: ${result.weight};">
      The quick brown fox jumps over the lazy dog
    </div>`,
  examples: [
    { type: "basic", size: 12, weight: 300 },
    { type: "basic", size: 16, weight: 400 },
    { type: "advanced", size: 20, weight: 700 },
  ],
};

export const textTest: Test<TextOptions, string> = {
  name: "text",
  output: (result) => `<p>${result}</p>`,
  hiddenKeys: ["data"],
  examples: [
    { type: "markov", words: 50 },
    { type: "markov", sentences: 3 },
    { type: "markov", paragraphs: 2, data: NIETZSCHE },
    { type: "markov", paragraphs: 1, data: NIETZSCHE },
  ],
};

export const symbolTest: Test<SymbolOptions, SVGElement> = {
  name: "symbol",
  output: (result) => result.outerHTML,
  examples: [
    { type: "3x3-path", size: 32 },
    { type: "3x3-path", size: 32 },
    { type: "3x3-path", size: 32 },
    { type: "3x3-path", size: 32 },
    { type: "3x3-path", size: 32 },
    { type: "mixed-shapes", size: 32 },
    { type: "mixed-shapes", size: 32 },
    { type: "mixed-shapes", size: 32 },
    { type: "mixed-shapes", size: 32 },
    { type: "mixed-shapes", size: 32 },
  ],
};

export const imageTest: Test<ImageOptions, { dataUrl: string }> = {
  name: "image",
  output: (result) => `<img src="${result.dataUrl}" alt="Generated Image">`,
  examples: [
    { type: "pixel", width: 200, height: 200 },
    { type: "pixel", width: 300, height: 200 },
    { type: "vector", width: 200, height: 300 },
  ],
};

export const fingerprintTest: Test<FingerprintOptions, string> = {
  name: "fingerprint",
  output: (result) => `<img src="${result}" alt="Generated Fingerprint">`,
  examples: [
    { type: "basic", size: 64 },
    { type: "basic", size: 128 },
    { type: "advanced", size: 256 },
  ],
};

export const tests = [
  symbolTest,
  textTest,
  fontTest,
  imageTest,
  fingerprintTest,
] as const;

export type TestType = (typeof tests)[number];
export type TestName = TestType["name"];
