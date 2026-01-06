/* eslint-disable @typescript-eslint/no-var-requires */
const { run } = require("react-snap");

const pages = require("../package.json")["static-pages"];

run({
  include: pages,
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  crawl: false,
  fixWebpackChunksIssue: "CRA2",
})
  .then(() => console.log("Static pages successfully rendered"))
  .catch((err) => console.log("Rendering static pages has been failed", err))
  .finally(() => process.exit(0));
