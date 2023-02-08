import "reflect-metadata";
import dotenvHandler from "dotenv";
import Application from "./App";

dotenvHandler.config();

(async function bootstrap() {
  try {
    await Application.init();

    Application.start();
  } catch (error) {
    console.error(`Failed to bootstrap the application: ${error}`);
  }
})();
