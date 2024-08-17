import jibber from "../src/index";

// Font Demo
const fontDemo = document.getElementById("font-demo") as HTMLParagraphElement;
const fontOutput = document.getElementById("font-output") as HTMLDivElement;
const font = jibber.font("futuristic", { seed: "123", weight: 700 });
fontDemo.style.fontFamily = font;
fontOutput.textContent = `Generated font: ${font}`;

// Text Demo
const textDemo = document.getElementById("text-demo") as HTMLParagraphElement;
const textOutput = document.getElementById("text-output") as HTMLDivElement;
const text = jibber.text("lorem", { seed: "456", length: 50 });
textDemo.textContent = text;
textOutput.textContent = `Generated text (50 characters): ${text}`;

// Symbol Demo
const symbolDemo = document.getElementById("symbol-demo") as HTMLDivElement;
const symbolOutput = document.getElementById("symbol-output") as HTMLDivElement;
const symbol = jibber.symbol("minimal-path", { seed: "789" });
symbolDemo.innerHTML = symbol;
symbolOutput.textContent = `Generated symbol SVG: ${symbol.slice(0, 100)}...`;

// Image Demo
const imageDemo = document.getElementById("image-demo") as HTMLDivElement;
const imageOutput = document.getElementById("image-output") as HTMLDivElement;
try {
  const image = jibber.image("pattern", { seed: "101112" });
  imageDemo.innerHTML = `<img src="${image}" alt="Generated Image" style="max-width: 200px;">`;
  imageOutput.textContent = `Generated image data: ${image.slice(0, 50)}...`;
} catch (error) {
  imageOutput.textContent = `Error generating image: ${
    (error as Error).message
  }`;
}

// Fingerprint Demo
const fingerprintDemo = document.getElementById(
  "fingerprint-demo"
) as HTMLDivElement;
const fingerprintOutput = document.getElementById(
  "fingerprint-output"
) as HTMLDivElement;
try {
  const fingerprint = jibber.fingerprint("default", { seed: "131415" });
  fingerprintDemo.innerHTML = fingerprint;
  fingerprintOutput.textContent = `Generated fingerprint: ${fingerprint.slice(
    0,
    100
  )}...`;
} catch (error) {
  fingerprintOutput.textContent = `Error generating fingerprint: ${
    (error as Error).message
  }`;
}
