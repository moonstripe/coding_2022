import "./style.css";
import App from "./App.svelte";

import { setup, strict, voidSheet } from 'twind'


setup({
  preflight: false, // do not include base style reset (default: use tailwind preflight)
  mode: strict, // throw errors for invalid rules (default: warn)
  hash: true, // hash all generated class names (default: false)
  theme: {}, // define custom theme values (default: tailwind theme)
  darkMode: 'class', // use a different dark mode strategy (default: 'media')
})

const app = new App({
  target: document.getElementById("app"),
});

export default app;
