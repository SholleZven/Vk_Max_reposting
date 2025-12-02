import { Bot } from "@maxhub/max-bot-api";
import { log } from "../core/logger";

if (!process.env.MAX_BOT_TOKEN) throw new Error("MAX_BOT_TOKEN is missing!");

export const bot = new Bot(process.env.MAX_BOT_TOKEN);

export async function sendMessageToMax(text: string) {
  const chatId = Number(process.env.MAX_CHANNEL_ID);
  await bot.api.sendMessageToChat(chatId, text);
  log.info("➡ Sent message to MAX");
}
