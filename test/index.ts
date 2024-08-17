import jibber from "../src";
import { demos, Demo, DemoName } from "./tests";

function generateDemoHTML(demo: Demo): string {
  return `
    <section class="demo-section">
      <h2>${demo.name.charAt(0).toUpperCase() + demo.name.slice(1)} Tests</h2>
      <div class="demo-controls">
        <button id="${demo.name}-randomise">Randomise</button>
      </div>
      ${Object.entries(demo.algorithms)
        .map(
          ([algorithm, variations]) => `
        <div class="algorithm-section">
          <h3>${
            algorithm.charAt(0).toUpperCase() + algorithm.slice(1)
          } Algorithm</h3>
          <div id="${demo.name}-${algorithm}-demos" class="demo-outputs"></div>
        </div>
      `
        )
        .join("")}
    </section>
  `;
}

function initializePage() {
  const container = document.getElementById("demo-container");
  if (container) {
    container.innerHTML = demos.map(generateDemoHTML).join("");
  }

  demos.forEach(setupDemo);
}

const generateOutput = async (
  name: DemoName,
  options: DemoOptions
): Promise<string> => {
  switch (name) {
    case "font":
      const fontResult = await jibber.font(options);
      return `<div style="font-family: '${fontResult.fontFamily}'; font-size: ${options.size}px; font-weight: ${options.weight};">
        The quick brown fox jumps over the lazy dog
      </div>`;
    case "text":
      return `<p>${await jibber.text(options)}</p>`;
    case "symbol":
      const symbolResult = await jibber.symbol(options);
      return `<img src="${symbolResult}" alt="Generated Symbol" width="${options.size}" height="${options.size}">`;
    case "image":
      const imageResult = await jibber.image(options);
      return `<img src="${imageResult.dataUrl}" alt="Generated Image" width="${options.width}" height="${options.height}">`;
    case "fingerprint":
      const fingerprintResult = await jibber.fingerprint(options);
      return `<img src="${fingerprintResult}" alt="Generated Fingerprint" width="${options.size}" height="${options.size}">`;
  }
};

const setupDemo = (demo: Demo) => {
  const randomiseButton = document.getElementById(`${demo.name}-randomise`);

  if (randomiseButton) {
    Object.entries(demo.algorithms).forEach(([algorithm, variations]) => {
      const demosElement = document.getElementById(
        `${demo.name}-${algorithm}-demos`
      );

      if (demosElement) {
        const createExampleElement = (index: number) => {
          const exampleElement = document.createElement("div");
          exampleElement.className = "demo-output";
          exampleElement.id = `${demo.name}-${algorithm}-demo-${index}`;
          demosElement.appendChild(exampleElement);
          return exampleElement;
        };

        const exampleElements = variations.map((_, i) =>
          createExampleElement(i)
        );

        const updateOutput = async (options: DemoOptions, index: number) => {
          const result = await generateOutput(demo.name, options);
          const configString = Object.entries(options)
            .filter(([key]) => key !== "algorithm" && key !== "seed")
            .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
            .join(", ");
          exampleElements[index].innerHTML = `
            <div class="demo-config">${configString}</div>
            <div class="demo-result">${result}</div>
          `;
        };

        const randomiseSeed = () => {
          variations.forEach((variation, index) => {
            const newOptions = { ...variation, algorithm, seed: Math.random() };
            updateOutput(newOptions, index);
          });
        };

        randomiseButton.addEventListener("click", randomiseSeed);

        // Initial render
        variations.forEach((variation, index) => {
          updateOutput({ ...variation, algorithm, seed: Math.random() }, index);
        });
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", initializePage);
