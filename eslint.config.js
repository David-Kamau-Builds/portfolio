export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        bootstrap: "readonly",
        AOS: "readonly",
        window: "readonly",
        document: "readonly",
        console: "readonly",
        navigator: "readonly",
        setTimeout: "readonly",
        localStorage: "readonly",
        FormData: "readonly",
        fetch: "readonly",
        URL: "readonly",
        performance: "readonly",
        crypto: "readonly",
        process: "readonly",
        module: "readonly",
        requestAnimationFrame: "readonly",
        SecurityUtils: "readonly",
        ErrorHandler: "readonly",
        alert: "readonly",
        IntersectionObserver: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error", 
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error"
    }
  }
];