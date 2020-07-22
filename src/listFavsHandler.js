const fs = require("fs-extra");
const path = require("path");
const os = require("os");

module.exports = async () => {
  const favs = await fs.readJson(path.join(os.homedir(), ".favs.json"), {
    throws: false,
  });

  if (!favs) {
    console.log("Currently no favorites saved");
    return;
  }

  console.table(favs);
};
