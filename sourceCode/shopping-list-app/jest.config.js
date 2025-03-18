// jest.config.js
module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!react-router-dom)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|jpg|jpeg|png)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
