/* eslint-disable @typescript-eslint/no-var-requires */
const rimraf = require("rimraf");
const path = require("path");

const buildFolders = ["build_server", "build"];

buildFolders.forEach((folderName) =>
  rimraf.sync(path.resolve(__dirname, `../${folderName}`))
);

console.log("Builds are deleted!");
