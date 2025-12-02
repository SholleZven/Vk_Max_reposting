import fs from "fs";
import { log } from "../core/logger";

const FILE_PATH = "./last_id.txt";

export function readLastId(): number {
  try {
    return Number(fs.readFileSync(FILE_PATH, "utf-8"));
  } catch {
    return 0;
  }
}

export function writeLastId(id: number) {
  fs.writeFileSync(FILE_PATH, id.toString(), "utf-8");
  log.info(`Updated last_id: ${id}`);
}
