import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "no-unused-vars": "error",
      semi: ["error", "always"],
      "no-console": "warn",
      // 🚨 THIS disables the React-in-scope error
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];
