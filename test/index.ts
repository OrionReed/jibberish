import jibber from "../src";
import { tests, TestType } from "./tests";

export type Test<Opts, Out> = {
  name: string;
  output: (result: Out) => string;
  examples: Opts[];
};

function generateTestHTML(test: TestType): string {
  const algorithmGroups = test.examples.reduce((acc, example) => {
    if (!acc[example.algorithm]) {
      acc[example.algorithm] = [];
    }
    acc[example.algorithm].push(example);
    return acc;
  }, {} as Record<string, Array<(typeof test.examples)[number]>>);

  return `
    <section class="test-section">
      <h2>${test.name.charAt(0).toUpperCase() + test.name.slice(1)} Tests</h2>
      <div class="test-controls">
        <button id="${test.name}-randomise">Randomise</button>
      </div>
      ${Object.entries(algorithmGroups)
        .map(
          ([algorithm, examples]) => `
        <div class="algorithm-section">
          <h3>${
            algorithm.charAt(0).toUpperCase() + algorithm.slice(1)
          } Algorithm</h3>
          <div id="${test.name}-${algorithm}-tests" class="test-outputs"></div>
        </div>
      `
        )
        .join("")}
    </section>
  `;
}

function initializePage() {
  const container = document.getElementById("test-container");
  if (container) {
    container.innerHTML = tests.map(generateTestHTML).join("");
  }

  tests.forEach(setupTest);
}

const setupTest = (test: TestType) => {
  const randomiseButton = document.getElementById(`${test.name}-randomise`);

  if (randomiseButton) {
    const algorithmGroups = test.examples.reduce((acc, example) => {
      if (!acc[example.algorithm]) {
        acc[example.algorithm] = [];
      }
      acc[example.algorithm].push(example);
      return acc;
    }, {} as Record<string, Array<(typeof test.examples)[number]>>);

    Object.entries(algorithmGroups).forEach(([algorithm, examples]) => {
      const testsElement = document.getElementById(
        `${test.name}-${algorithm}-tests`
      );

      if (testsElement) {
        const createExampleElement = (index: number) => {
          const exampleElement = document.createElement("div");
          exampleElement.className = "test-output";
          exampleElement.id = `${test.name}-${algorithm}-test-${index}`;
          testsElement.appendChild(exampleElement);
          return exampleElement;
        };

        const exampleElements = examples.map((_, i) => createExampleElement(i));

        const updateOutput = async (
          example: (typeof examples)[number],
          index: number
        ) => {
          const options = { ...example, seed: Math.random() };
          const result = await jibber[test.name](options);
          const configString = Object.entries(options)
            .filter(([key]) => key !== "algorithm" && key !== "seed")
            .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
            .join(", ");
          exampleElements[index].innerHTML = `
            <div class="test-config">${configString}</div>
            <div class="test-result">${test.output(result)}</div>
          `;
        };

        const randomiseSeed = () => {
          examples.forEach((example, index) => {
            updateOutput(example, index);
          });
        };

        randomiseButton.addEventListener("click", randomiseSeed);

        // Initial render
        examples.forEach((example, index) => {
          updateOutput(example, index);
        });
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", initializePage);
