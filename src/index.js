#!/usr/bin/env node

const { promisify } = require("util");
const app = require("commander");
const listModeHandler = require("./listModeHandler");
const connectModeHandler = require("./connectModeHandler");
const exec = promisify(require("child_process").exec);
const prompt = require("prompt-sync")();
const fs = require("fs-extra");
const path = require("path");
const listFavsHandler = require("./listFavsHandler");
const connectFavs = require("./connectFavs");
const os = require("os");

fs.ensureFileSync(path.join(os.homedir(), ".favs.json"));

app
  .version("0.0.1")
  .option("-l --list [list]", "What should I show?")
  .option("-c --country [country]", "On which country to we operate?")
  .option("-i --city [city]", "On which city do we operate?")
  .option("-s --server [server]", "On which server do we operate?")
  .option("-g --go", "Connect with the given options")
  .option("-d --disconnect", "Disconnect from Cyberghost")
  .option("-f --favorites [index]", "Show favorites")
  .option("-x --save", "Save connection as favorite")
  .option("--status", "Show connection status")
  .action(async (options) => {
    if (options.status) {
      const { stdout } = await exec(`cyberghostvpn --status`);
      console.log(stdout);
      return;
    }

    if (options.list && !options.go) {
      // We are in list mode
      console.log(await listModeHandler(options));
      return;
    }

    if (options.go && !options.list && !options.favorites) {
      // We are in connect mode
      console.log(await connectModeHandler(options));
      return;
    }

    if (options.disconnect && !options.go && !options.list) {
      const password = prompt.hide("Enter your password: ");
      const { stdout } = await exec(
        `echo ${password} | sudo -S cyberghostvpn --stop`
      );
      console.log(stdout);
      return;
    }

    if (options.favorites && !options.go && !options.list) {
      // Show Favorites
      await listFavsHandler();
      return;
    }

    if (options.favorites && options.go && !options.list) {
      // Show Favorites
      console.log(await connectFavs(options.favorites));
      return;
    }

    // unkwown mode
    console.log("ERROR! You can either list or connect but not both");
  });

app.parse(process.argv);
