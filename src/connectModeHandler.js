const { promisify } = require("util");
const { generateMask } = require("./helpers/index");
const exec = promisify(require("child_process").exec);
const prompt = require("prompt-sync")();
const fs = require("fs-extra");
const path = require("path");
const os = require("os");

module.exports = async (options) => {
  const mask = generateMask(options);

  switch (mask) {
    case "100": {
      const password = prompt.hide("Enter your password: ");
      // Connect to country
      const { stdout } = await exec(
        `echo ${password} | sudo -S cyberghostvpn --traffic --country-code ${options.country} --connect`
      );

      if (options.save) {
        let favs = fs.readJsonSync(path.join(os.homedir(), ".favs.json"), {
          throws: false,
        });

        if (!favs) {
          favs = [];
        }

        favs.push(
          `sudo -S cyberghostvpn --traffic --country-code ${options.country} --connect`
        );
        fs.writeJsonSync(path.join(os.homedir(), ".favs.json"), favs);
      }

      return stdout;
    }

    case "110": {
      // Connect to city in a country
      const password = prompt.hide("Enter your password: ");
      const { stdout } = await exec(
        `echo ${password} | sudo -S cyberghostvpn --traffic --country-code ${options.country} --city ${options.city} --connect`
      );

      if (options.save) {
        let favs = fs.readJsonSync(path.join(os.homedir(), ".favs.json"), {
          throws: false,
        });

        if (!favs) {
          favs = [];
        }

        favs.push(
          `sudo -S cyberghostvpn --traffic --country-code ${options.country} --city ${options.city} --connect`
        );
        fs.writeJsonSync(path.join(os.homedir(), ".favs.json"), favs);
      }

      return stdout;
    }

    case "111": {
      // Connect to a server in a city in a country
      const password = prompt.hide("Enter your password: ");
      const { stdout } = await exec(
        `echo ${password} | sudo -S cyberghostvpn --traffic --country-code ${options.country} --city ${options.city} --server ${options.server} --connect`
      );

      if (options.save) {
        let favs = fs.readJsonSync(path.join(os.homedir(), ".favs.json"), {
          throws: false,
        });

        if (!favs) {
          favs = [];
        }

        favs.push(
          `sudo -S cyberghostvpn --traffic --country-code ${options.country} --city ${options.city} --server ${options.server} --connect`
        );
        fs.writeJsonSync(path.join(os.homedir(), ".favs.json"), favs);
      }

      return stdout;
    }

    default:
      return "ERROR! Unknown action provided";
  }
};
