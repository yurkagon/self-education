/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs").promises;
const path = require("path");

const pathServiceWorker = path.resolve(__dirname, "../build/service-worker.js");

(async () => {
  try {
    const data = await fs.readFile(pathServiceWorker, "utf-8");

    const newData = data.replace("index.html", "200.html");

    await fs.writeFile(pathServiceWorker, newData, "utf-8");

    console.log("Service worker updated");
  } catch (err) {
    console.log("ServiceForker has failed to be updated", err);
  }
})();
