const fs = require("fs-extra");
const path = require("path");

module.exports = async () => {
  const favs = await fs.readJson(path.join(process.cwd(), "favs.json"), {
    throws: false,
  });

  if (!favs) {
    console.log("Currently no favorites saved");
    return;
  }

  console.table(favs);
};
