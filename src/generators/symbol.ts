// Symbol generator

import { SeededRandom } from "../utils/random";

export type SymbolAlgorithm = "basic" | "extended" | "arrows";

export interface SymbolOptions {
  // Add any specific options for symbols
}

export function generateSymbol(
  algorithm: SymbolAlgorithm,
  opts: SymbolOptions = {}
): string {
  const rng = new SeededRandom(algorithm);

  switch (algorithm) {
    case "basic":
      return generateBasicSymbol(rng);
    case "extended":
      return generateExtendedSymbol(rng);
    case "arrows":
      return generateArrowSymbol(rng);
    default:
      throw new Error(`Unknown symbol algorithm: ${algorithm}`);
  }
}

function generateBasicSymbol(rng: SeededRandom): string {
  const symbols = "☮☯♻♾⚛⚕⚜⚡⚠";
  return symbols[rng.nextInt(0, symbols.length - 1)];
}

function generateExtendedSymbol(rng: SeededRandom): string {
  const symbols = "♠♣♥♦♤♧♡♢♩♪♫♬♭♮♯";
  return symbols[rng.nextInt(0, symbols.length - 1)];
}

function generateArrowSymbol(rng: SeededRandom): string {
  const symbols = "←↑→↓↔↕↖↗↘↙";
  return symbols[rng.nextInt(0, symbols.length - 1)];
}
