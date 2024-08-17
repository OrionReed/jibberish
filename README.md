# Jibber

Jibber is a JavaScript library for useful gibberish. It simplifies the creation of random yet _plausible_ UI elements, text, fonts, and images.

Jibber can be used for placeholders, layout testing, or fingerprinting — unique visual identifiers for specific data, designed for easy human differentiation.

## Installation

```bash
npm install jibber
# or
yarn add jibber
```

then

```html
<script type="module">
  import jibber from "jibber";
  const font = jibber.font("futuristic", { seed: "123", weight: 700 });
  const text = jibber.text("lorem", { seed: "123", length: 10 });
  const symbol = jibber.symbol("minimal-path", { seed: "123" });
  // Apply the generated font to a heading
  document.getElementById("jibber-heading").style.fontFamily = font;
  // Set the generated text content
  document.getElementById("jibber-text").textContent = text;
  // Insert the generated symbol SVG
  document.getElementById("jibber-symbol").innerHTML = symbol;
</script>

<body>
  <h1 id="jibber-heading">Jibber Example</h1>
  <p id="jibber-text"></p>
  <div id="jibber-symbol"></div>
</body>
```
