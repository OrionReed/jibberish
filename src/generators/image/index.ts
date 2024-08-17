import { BaseOpts, JibberGenerator } from "../..";

export interface ImageOptions extends BaseOpts {
  algorithm: "pixel" | "vector";
  dimensions: { width: number; height: number };
}

export type ImageResult = HTMLImageElement;

export const generateImage: JibberGenerator<ImageOptions, ImageResult> = (
  opts
) => {
  const { algorithm, dimensions } = opts;
  const img = new Image(dimensions.width, dimensions.height);

  // In a real implementation, you would generate the image data here
  // For now, we'll just set a placeholder src
  img.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${dimensions.width}" height="${dimensions.height}"><rect width="100%" height="100%" fill="gray"/></svg>`;

  return img;
};
