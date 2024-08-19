import { BaseOpts, JibberGenerator } from "../..";

export interface FontOptions extends BaseOpts {
  type: "basic" | "advanced";
  style: "serif" | "sans-serif" | "monospace";
}

export type FontResult = string; // For simplicity, we'll keep it as a string for now

export const generateFont: JibberGenerator<FontOptions, FontResult> = (
  opts
) => {
  const { type, style } = opts;
  return `Generated ${type} ${style} font`; // In a real implementation, this would return actual font data
};
