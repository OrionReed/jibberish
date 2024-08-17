import jibber, {
  FontAlgorithm,
  TextAlgorithm,
  SymbolAlgorithm,
  ImageAlgorithm,
  FingerprintAlgorithm,
} from "../src";

interface DemoConfig {
  name: string;
  algorithms: string[];
  generate: (
    algorithm: any,
    opts?: { seed?: string | number }
  ) => Promise<string>;
}

const demos: DemoConfig[] = [
  {
    name: "font",
    algorithms: ["default", "serif", "sans-serif", "monospace"],
    generate: async (algorithm: FontAlgorithm, opts) => {
      const font = await jibber.font(algorithm, opts);
      return `<span style="font-family: '${font}';">This text uses the generated font.</span>`;
    },
  },
  {
    name: "text",
    algorithms: ["default", "lorem", "nietzsche"],
    generate: (algorithm: TextAlgorithm, opts) => jibber.text(algorithm, opts),
  },
  {
    name: "symbol",
    algorithms: ["default", "geometric", "abstract", "iconic"],
    generate: (algorithm: SymbolAlgorithm, opts) =>
      jibber.symbol(algorithm, opts),
  },
  {
    name: "image",
    algorithms: ["default", "abstract", "landscape", "portrait"],
    generate: async (algorithm: ImageAlgorithm, opts) => {
      const imageUrl = await jibber.image(algorithm, opts);
      return `<img src="${imageUrl}" alt="Generated Image">`;
    },
  },
  {
    name: "fingerprint",
    algorithms: ["default", "circular", "linear", "grid"],
    generate: (algorithm: FingerprintAlgorithm, opts) =>
      jibber.fingerprint(algorithm, opts),
  },
];

const setupDemo = (demo: DemoConfig) => {
  const algorithmSelect = document.getElementById(
    `${demo.name}-algorithm`
  ) as HTMLSelectElement;
  const seedInput = document.getElementById(
    `${demo.name}-seed`
  ) as HTMLInputElement;
  const demoElement = document.getElementById(`${demo.name}-demo`);
  const outputElement = document.getElementById(`${demo.name}-output`);

  // Populate algorithm options
  algorithmSelect.innerHTML = demo.algorithms
    .map((alg) => `<option value="${alg}">${alg}</option>`)
    .join("");

  const updateOutput = async () => {
    const algorithm = algorithmSelect.value;
    const seed = seedInput.value;
    try {
      const result = await demo.generate(algorithm, { seed });
      if (demoElement) demoElement.innerHTML = result;
      if (outputElement) outputElement.textContent = `Output: ${result}`;
    } catch (error) {
      if (outputElement) outputElement.textContent = `Error: ${error}`;
    }
  };

  algorithmSelect.addEventListener("change", updateOutput);
  seedInput.addEventListener("input", updateOutput);
  updateOutput(); // Initial update
};

demos.forEach(setupDemo);
