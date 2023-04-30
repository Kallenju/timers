module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },

  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:node/recommended", "prettier"],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["@typescript-eslint", "jest", "prettier"],

  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "node/no-unsupported-features/es-syntax": ["error", { ignores: ["modules"] }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "prettier/prettier": "error",
    "no-process-exit": 0,
  },

  settings: {
    "import/resolver": {
      typescript: {},
    },
    node: {
      tryExtensions: [".js", ".json", ".node", ".ts", ".d.ts"],
    },
  },
};
