import { BaseOpts, JibberGenerator } from "../..";
import { threeByThreePath, ThreeByThreePathOptions } from "./threeByThreePath";
import { mixedShapes, MixedShapesOptions } from "./mixedShapes";

export type SymbolOptions = ThreeByThreePathOptions | MixedShapesOptions;

export const generateSymbol: JibberGenerator<SymbolOptions, SVGElement> = (
  opts
) => {
  switch (opts.type) {
    case "3x3-path":
      return threeByThreePath(opts);
    case "mixed-shapes":
      return mixedShapes(opts);
    default:
      throw new Error(`Unsupported symbol type: ${(opts as any).type}`);
  }
};

export type { ThreeByThreePathOptions, MixedShapesOptions };
