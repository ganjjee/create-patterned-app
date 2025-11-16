#!/usr/bin/env node

const { pathToFileURL } = require("url");
const { resolve } = require("path");

const mainPath = resolve(__dirname, "../dist/main.js");

import(pathToFileURL(mainPath).href).catch((err) => {
  console.error("❌ Failed to start CLI:", err);
  process.exit(1);
});
