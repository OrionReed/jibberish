import jibber, {
  FontOptions,
  TextOptions,
  SymbolOptions,
  ImageOptions,
  FingerprintOptions,
} from "../src";

type DemoOptions =
  | FontOptions
  | TextOptions
  | SymbolOptions
  | ImageOptions
  | FingerprintOptions;

export const demos = [
  {
    name: "font" as const,
    algorithms: {
      basic: [
        { size: 12, weight: 300 },
        { size: 16, weight: 400 },
      ],
      advanced: [{ size: 20, weight: 700 }],
    },
  },
  {
    name: "text" as const,
    algorithms: {
      markov: [{ length: 50 }, { length: 100 }],
      alphaChars: [{ length: 150 }],
    },
  },
  {
    name: "symbol" as const,
    algorithms: {
      basic: [{ size: 32 }, { size: 64 }],
      complex: [{ size: 128 }],
    },
  },
  {
    name: "image" as const,
    algorithms: {
      pixel: [
        { width: 200, height: 200 },
        { width: 300, height: 200 },
      ],
      vector: [{ width: 200, height: 300 }],
    },
  },
  {
    name: "fingerprint" as const,
    algorithms: {
      basic: [{ size: 64 }, { size: 128 }],
      advanced: [{ size: 256 }],
    },
  },
] as const;

export type Demo = (typeof demos)[number];
export type DemoName = Demo["name"];
