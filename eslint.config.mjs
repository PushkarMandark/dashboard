import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    rules: {
      // Error prevention
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "no-undef": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      
      // Code style
      "prefer-const": "error",
      "jsx-quotes": ["error", "prefer-double"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      
      // React specific
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": "error",
      "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
      
      // ES6+
      "arrow-body-style": ["error", "as-needed"],
      "arrow-parens": ["error", "always"],
      "no-var": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      
      // Import organization
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true },
      }],
      "import/no-duplicates": "error",
    },
  },
];

export default eslintConfig;

