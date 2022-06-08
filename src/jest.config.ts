export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "json", "ts", "jsx", "tsx", "node"],
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
