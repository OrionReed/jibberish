import { Test } from ".";
import {
  FontOptions,
  TextOptions,
  SymbolOptions,
  ImageOptions,
  FingerprintOptions,
  FontResult,
} from "../src";

export const fontTest: Test<FontOptions, FontResult> = {
  name: "font",
  output: (result) => `
    <div style="font-family: '${result.fontFamily}'; font-size: ${result.size}px; font-weight: ${result.weight};">
      The quick brown fox jumps over the lazy dog
    </div>`,
  examples: [
    { algorithm: "basic", size: 12, weight: 300 },
    { algorithm: "basic", size: 16, weight: 400 },
    { algorithm: "advanced", size: 20, weight: 700 },
  ],
};

export const textTest: Test<TextOptions, string> = {
  name: "text",
  output: (result) => `<p>${result}</p>`,
  examples: [
    { algorithm: "markov", length: 50 },
    { algorithm: "markov", length: 100 },
    { algorithm: "alphaChars", length: 150 },
  ],
};

export const symbolTest: Test<SymbolOptions, string> = {
  name: "symbol",
  output: (result) => `<img src="${result}" alt="Generated Symbol">`,
  examples: [
    { algorithm: "basic", size: 32 },
    { algorithm: "basic", size: 64 },
    { algorithm: "complex", size: 128 },
  ],
};

export const imageTest: Test<ImageOptions, { dataUrl: string }> = {
  name: "image",
  output: (result) => `<img src="${result.dataUrl}" alt="Generated Image">`,
  examples: [
    { algorithm: "pixel", width: 200, height: 200 },
    { algorithm: "pixel", width: 300, height: 200 },
    { algorithm: "vector", width: 200, height: 300 },
  ],
};

export const fingerprintTest: Test<FingerprintOptions, string> = {
  name: "fingerprint",
  output: (result) => `<img src="${result}" alt="Generated Fingerprint">`,
  examples: [
    { algorithm: "basic", size: 64 },
    { algorithm: "basic", size: 128 },
    { algorithm: "advanced", size: 256 },
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
