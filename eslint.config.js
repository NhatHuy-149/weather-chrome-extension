module.exports = {
    "plugins": ["react", "react-hooks"],
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "rules": {
      "react/prop-types": "off", // Optional: Disable if not using PropTypes
      "react/no-string-refs": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    "settings": {
      "react": {
        "version": "detect" // Automatically detects the React version
      }
    }
  };