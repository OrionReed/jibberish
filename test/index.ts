import { demos, DemoConfig, JibberOptions } from "./config";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { lintKeymap } from "@codemirror/lint";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from "@codemirror/view";
import { json } from "@codemirror/lang-json";

function generateDemoHTML(demo: DemoConfig): string {
  return `
    <section class="demo-section">
      <h2>${demo.name.charAt(0).toUpperCase() + demo.name.slice(1)} Demo</h2>
      <div id="${demo.name}-demo" class="demo-output"></div>
      <div id="${demo.name}-editor" class="json-editor"></div>
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

const setupDemo = (demo: DemoConfig) => {
  const editorElement = document.getElementById(`${demo.name}-editor`);
  const demoElement = document.getElementById(`${demo.name}-demo`);

  if (editorElement && demoElement) {
    const defaultOptions: JibberOptions[typeof demo.name] = demo.defaultOptions;
    const initialJson = JSON.stringify(defaultOptions, null, 2);

    const updateOutput = (view: EditorView) => {
      try {
        const jsonString = view.state.doc.toString();
        const opts = JSON.parse(jsonString) as JibberOptions[typeof demo.name];
        demo.generate(opts).then((result) => {
          demoElement.innerHTML = result;
        });
      } catch (error) {
        demoElement.textContent = `Error: ${error}`;
      }
    };

    const editor = new EditorView({
      parent: editorElement,
      state: EditorState.create({
        doc: initialJson,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          history(),
          foldGutter(),
          drawSelection(),
          dropCursor(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          rectangularSelection(),
          crosshairCursor(),
          highlightActiveLine(),
          highlightSelectionMatches(),
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            ...lintKeymap,
          ]),
          json(),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              updateOutput(update.view);
            }
          }),
        ],
      }),
    });

    updateOutput(editor);
  }
};

document.addEventListener("DOMContentLoaded", initializePage);
