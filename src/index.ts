import { repostFromVK } from "./services/repostService";
import config from "./config";
import { log } from "./core/logger";

async function mainLoop() {
  while (true) {
    try {
      await repostFromVK();
      if (config.SINGLE_START) {
        log.info("Script finished (single start)");
        break;
      }
      log.info(`Sleeping for ${config.TIME_TO_SLEEP}s...`);
      await new Promise(r => setTimeout(r, config.TIME_TO_SLEEP * 1000));
    } catch (e) {
      log.error("Error in main loop: " + e);
      await new Promise(r => setTimeout(r, config.TIME_TO_SLEEP * 1000));
    }
  }
}

mainLoop();
