import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    languageOptions: {
      globals: globals.browser,
    },
    extends: ["js/recommended"],
    rules: {
      "react/prop-types": "off", // ✅ Disable prop-types warning here
    },
  },
  // You can also add this rule if using the react plugin config below too
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/prop-types": "off", // ✅ Ensure it's off even in react config
    },
  },
]);
