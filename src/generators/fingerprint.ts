import { SeededRandom } from "../utils/random";

export type FingerprintAlgorithm = "circular" | "linear" | "spiral";

export interface FingerprintOptions {
  size?: number;
}

export function generateFingerprint(
  algorithm: FingerprintAlgorithm,
  opts: FingerprintOptions = {}
): string {
  const rng = new SeededRandom(algorithm);
  const size = opts.size || 200;

  switch (algorithm) {
    case "circular":
      return generateCircularFingerprint(rng, size);
    case "linear":
      return generateLinearFingerprint(rng, size);
    case "spiral":
      return generateSpiralFingerprint(rng, size);
    default:
      throw new Error(`Unknown fingerprint algorithm: ${algorithm}`);
  }
}

function generateCircularFingerprint(rng: SeededRandom, size: number): string {
  const circles = [];
  const numCircles = rng.nextInt(5, 15);
  for (let i = 0; i < numCircles; i++) {
    const r = ((size / 2) * (i + 1)) / numCircles;
    const strokeWidth = size / 100;
    const dashArray = `${rng.nextInt(1, 10)} ${rng.nextInt(1, 10)}`;
    circles.push(
      `<circle cx="${size / 2}" cy="${
        size / 2
      }" r="${r}" fill="none" stroke="black" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" />`
    );
  }
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${circles.join(
    ""
  )}</svg>`;
}

function generateLinearFingerprint(rng: SeededRandom, size: number): string {
  const lines = [];
  const numLines = rng.nextInt(10, 30);
  for (let i = 0; i < numLines; i++) {
    const y = (size * i) / numLines;
    const strokeWidth = size / 100;
    const dashArray = `${rng.nextInt(1, 10)} ${rng.nextInt(1, 10)}`;
    lines.push(
      `<line x1="0" y1="${y}" x2="${size}" y2="${y}" stroke="black" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" />`
    );
  }
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${lines.join(
    ""
  )}</svg>`;
}

function generateSpiralFingerprint(rng: SeededRandom, size: number): string {
  const points = [];
  const numPoints = rng.nextInt(100, 300);
  const maxRadius = size / 2;
  for (let i = 0; i < numPoints; i++) {
    const angle = i * 0.1;
    const radius = (i / numPoints) * maxRadius;
    const x = size / 2 + radius * Math.cos(angle);
    const y = size / 2 + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><polyline points="${points.join(
    " "
  )}" fill="none" stroke="black" stroke-width="${size / 100}" /></svg>`;
}
