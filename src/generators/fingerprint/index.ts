import { BaseOpts, JibberGenerator } from "../..";

export interface FingerprintOptions extends BaseOpts {
  type: "basic" | "advanced";
  complexity: number;
}

export const generateFingerprint: JibberGenerator<
  FingerprintOptions,
  string
> = (opts) => {
  const { type, complexity } = opts;
  return `Generated ${type} fingerprint with complexity ${complexity}`;
};
