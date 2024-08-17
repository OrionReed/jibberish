import { BaseOpts, JibberGenerator } from "../..";

export interface SymbolOptions extends BaseOpts {
  algorithm: "basic" | "complex";
  category: "geometric" | "abstract" | "nature";
}

export const generateSymbol: JibberGenerator<SymbolOptions, SVGElement> = (
  opts
) => {
  const { algorithm, category } = opts;
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("width", "100");
  svgElement.setAttribute("height", "100");

  // Here you would add the actual SVG content based on the algorithm and category
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", "50");
  circle.setAttribute("cy", "50");
  circle.setAttribute("r", "40");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("fill", "red");

  svgElement.appendChild(circle);

  return svgElement;
};
