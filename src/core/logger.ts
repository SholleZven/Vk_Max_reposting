import { createLogger, transports, format } from "winston";

export const log = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] [${level}] ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./logs/debug.log", maxsize: 10485760, maxFiles: 5 })
  ],
});
