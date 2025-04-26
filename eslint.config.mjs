import js from "@eslint/js";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

// Setup proper directory references in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse .gitignore to exclude those files
const gitignorePath = path.join(__dirname, ".gitignore");
const gitignoreContent = readFileSync(gitignorePath, "utf8");
const gitignorePatterns = gitignoreContent
  .split("\n")
  .filter((line) => line && !line.startsWith("#"));

export default [
  // Base configuration for all JavaScript files
  {
    ignores: [
      ...gitignorePatterns,
      "dist",
      "build",
      "coverage",
      "**/*.min.js",
      "eslint.config.js",
    ],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...js.configs.recommended.rules,
      // Add basic style rules
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-console": ["warn"],
      "no-unused-vars": ["warn"],
    },
  },
];
