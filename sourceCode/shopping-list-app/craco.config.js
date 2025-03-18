// craco.config.js
module.exports = {
  jest: {
    configure: (jestConfig) => {
      // Map react-router-dom to the manual mock so Jest always finds it
      jestConfig.moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        "^react-router-dom$": "<rootDir>/__mocks__/react-router-dom.js",
      };
      return jestConfig;
    },
  },
};
