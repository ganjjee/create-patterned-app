#!/usr/bin/env node

const { pathToFileURL } = require("url");
const { dirname, resolve } = require("path");
const { fileURLToPath } = require("url");

const __dirname = dirname(fileURLToPath(require.main.filename));
const mainPath = resolve(__dirname, "../dist/main.js");

import(pathToFileURL(mainPath).href).catch((err) => {
  console.error("❌ Failed to start CLI:", err);
  process.exit(1);
});
