import { BaseOpts, JibberGenerator } from "../..";
import { SeededRandom } from "../../utils/random";

export interface MixedShapesOptions extends BaseOpts {
  algorithm: "mixed-shapes";
  size: number;
}

export const mixedShapes: JibberGenerator<MixedShapesOptions, SVGElement> = (
  opts
) => {
  const { size, seed = 0 } = opts;
  const random = new SeededRandom(seed);

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("width", size.toString());
  svgElement.setAttribute("height", size.toString());
  svgElement.setAttribute("viewBox", "0 0 100 100");

  const shapes = [
    createCircle(random),
    createRect(random),
    createTriangle(random),
  ];

  for (const shape of shapes) {
    svgElement.appendChild(shape);
  }

  return svgElement;
};

function createCircle(random: SeededRandom): SVGCircleElement {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", (random.next() * 80 + 10).toString());
  circle.setAttribute("cy", (random.next() * 80 + 10).toString());
  circle.setAttribute("r", (random.next() * 20 + 5).toString());
  circle.setAttribute("fill", random.nextColor());
  return circle;
}

function createRect(random: SeededRandom): SVGRectElement {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", (random.next() * 70 + 10).toString());
  rect.setAttribute("y", (random.next() * 70 + 10).toString());
  rect.setAttribute("width", (random.next() * 30 + 10).toString());
  rect.setAttribute("height", (random.next() * 30 + 10).toString());
  rect.setAttribute("fill", random.nextColor());
  return rect;
}

function createTriangle(random: SeededRandom): SVGPolygonElement {
  const triangle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  const points = [
    [random.next() * 100, random.next() * 100],
    [random.next() * 100, random.next() * 100],
    [random.next() * 100, random.next() * 100],
  ];
  triangle.setAttribute("points", points.map((p) => p.join(",")).join(" "));
  triangle.setAttribute("fill", random.nextColor());
  return triangle;
}
