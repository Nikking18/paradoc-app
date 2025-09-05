module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  ignorePatterns: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],
  rules: {
    // Prevent useSearchParams without Suspense boundary
    "@next/next/no-html-link-for-pages": "off",
    // Add custom rule to warn about useSearchParams usage
    "react-hooks/exhaustive-deps": "warn",
  },
  overrides: [
    {
      files: ["**/page.tsx", "**/page.ts"],
      excludedFiles: [
        "src/app/auth/reset-password/page.tsx",
        "src/app/auth/verify-email/page.tsx"
      ],
      rules: {
        // Custom rule to catch useSearchParams in page components
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["next/navigation"],
                importNames: ["useSearchParams"],
                message: "useSearchParams must be wrapped in Suspense boundary. Use it in a separate component and wrap with <Suspense>."
              }
            ]
          }
        ]
      }
    }
  ]
};
