import jibber from "../src";

type JibberKey = keyof typeof jibber;

export interface DemoConfig {
  name: JibberKey;
  algorithms: readonly string[];
  generate: (opts: any) => Promise<string>;
  generator: (typeof jibber)[JibberKey];
  defaultOptions: JibberOptions[JibberKey];
}

export const demos: DemoConfig[] = Object.entries(jibber).map(
  ([name, generator]) => ({
    name: name as JibberKey,
    algorithms: generator.algorithms,
    generate: async (opts: any) => {
      const result = await generator(opts);
      if (name === "font") {
        return `<span style="font-family: '${result}';">This text uses the generated font.</span>`;
      }
      if (name === "symbol") {
        return (result as SVGElement).outerHTML;
      }
      if (name === "image") {
        return `<img src="${(result as any).src}" alt="Generated Image">`;
      }
      return String(result);
    },
    generator,
    defaultOptions: {
      algorithm: generator.algorithms[0],
      seed: "default",
    },
  })
);

// Export types for JSON editor
export type JibberOptions = {
  [K in JibberKey]: {
    algorithm: (typeof jibber)[K]["algorithms"][number];
    seed?: string | number;
  };
};
