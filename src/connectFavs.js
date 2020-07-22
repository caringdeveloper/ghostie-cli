const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const fs = require("fs-extra");
const path = require("path");
const prompt = require("prompt-sync")();

module.exports = async (index) => {
  const favs = await fs.readJson(path.join(process.cwd(), "favs.json"));
  const fav = favs[index];

  if (!fav) return "ERROR! Bad index";

  const password = prompt.hide("Enter your password: ");
  // Connect to country
  const { stdout } = await exec(`echo ${password} | ${fav}`);

  return stdout;
};
