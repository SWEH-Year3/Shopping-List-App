// config-overrides.js
module.exports = function override(config, env) {
  if (env === "test") {
    // Modify transformIgnorePatterns to allow react-router-dom to be transformed
    config.transformIgnorePatterns = config.transformIgnorePatterns.map(
      (pattern) =>
        pattern.replace("node_modules", "node_modules/(?!react-router-dom)")
    );
  }
  return config;
};
