const { promisify } = require("util");
const { generateMask } = require("./helpers/index");
const exec = promisify(require("child_process").exec);

module.exports = async (options) => {
  const mask = generateMask(options);

  switch (mask) {
    case "100": {
      const { stdout } = await exec(
        `cyberghostvpn --traffic --country-code ${options.country}`
      );
      return stdout;
    }

    case "110": {
      const { stdout } = await exec(
        `cyberghostvpn --traffic --country-code ${options.country} --city ${options.city}`
      );
      return stdout;
    }

    default:
      return "ERROR! Unknown action provided";
  }
};
