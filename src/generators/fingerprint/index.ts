import { BaseOpts, JibberGenerator } from "../..";

export interface FingerprintOptions extends BaseOpts {
  algorithm: "basic" | "advanced";
  complexity: number;
}

export const generateFingerprint: JibberGenerator<
  FingerprintOptions,
  string
> = (opts) => {
  const { algorithm, complexity } = opts;
  return `Generated ${algorithm} fingerprint with complexity ${complexity}`;
};
