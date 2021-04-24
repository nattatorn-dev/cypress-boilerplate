import * as fs from "fs-extra";
import * as path from "path";

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(".", "cypress/config", `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = (_on, config) => {
  const file = config.env.configFile || "development";
  return getConfigurationByFile(file);
};
