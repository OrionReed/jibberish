import { BaseOpts, JibberGenerator } from "../..";
import { SeededRandom } from "../../utils/random";

export interface ThreeByThreePathOptions extends BaseOpts {
  algorithm: "3x3-path";
  size: number;
}

export const threeByThreePath: JibberGenerator<
  ThreeByThreePathOptions,
  SVGElement
> = (opts) => {
  const { size, seed = 0 } = opts;
  const random = new SeededRandom(seed);

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("width", size.toString());
  svgElement.setAttribute("height", size.toString());
  svgElement.setAttribute("viewBox", "0 0 100 100");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "black");
  path.setAttribute("stroke-width", "5");

  const grid = generateGrid(random);
  const pathData = generatePath(grid, random);
  path.setAttribute("d", pathData);

  svgElement.appendChild(path);
  return svgElement;
};

function generateGrid(random: SeededRandom): [number, number][] {
  const grid: [number, number][] = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const offsetX = random.next() * 10 - 5;
      const offsetY = random.next() * 10 - 5;
      grid.push([x * 50 + offsetX + 25, y * 50 + offsetY + 25]);
    }
  }
  return grid;
}

function generatePath(grid: [number, number][], random: SeededRandom): string {
  const visitedIndices = new Set<number>();
  let currentIndex = Math.floor(random.next() * 9);
  visitedIndices.add(currentIndex);

  let pathData = `M ${grid[currentIndex][0]} ${grid[currentIndex][1]}`;

  while (visitedIndices.size < 9) {
    const nextIndex = getNextIndex(currentIndex, visitedIndices, random);
    visitedIndices.add(nextIndex);

    const [x1, y1] = grid[currentIndex];
    const [x2, y2] = grid[nextIndex];
    const controlX = (x1 + x2) / 2 + (random.next() * 20 - 10);
    const controlY = (y1 + y2) / 2 + (random.next() * 20 - 10);

    pathData += ` Q ${controlX} ${controlY}, ${x2} ${y2}`;
    currentIndex = nextIndex;
  }

  return pathData;
}

function getNextIndex(
  currentIndex: number,
  visitedIndices: Set<number>,
  random: SeededRandom
): number {
  const possibleMoves = [
    currentIndex % 3 > 0 ? currentIndex - 1 : -1,
    currentIndex % 3 < 2 ? currentIndex + 1 : -1,
    currentIndex > 2 ? currentIndex - 3 : -1,
    currentIndex < 6 ? currentIndex + 3 : -1,
  ].filter((index) => index !== -1 && !visitedIndices.has(index));

  if (possibleMoves.length === 0) {
    return Array.from(
      new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]).difference(visitedIndices)
    )[0];
  }

  return possibleMoves[Math.floor(random.next() * possibleMoves.length)];
}
