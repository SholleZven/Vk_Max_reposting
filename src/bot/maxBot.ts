import { Bot, ShareAttachment, FileAttachment } from "@maxhub/max-bot-api";
import { log } from "../core/logger";
import { DownloadedDocument } from "../core/types";

if (!process.env.MAX_BOT_TOKEN) throw new Error("MAX_BOT_TOKEN is missing!");

export const bot = new Bot(process.env.MAX_BOT_TOKEN);

export async function sendMessageToMax(
  text: string,
  media: string[],
  documents: DownloadedDocument[]
) {
  const chatId = Number(process.env.MAX_CHANNEL_ID);

  const attachments = media.map(url => new ShareAttachment({ url }).toJson());
  await bot.api.sendMessageToChat(chatId, text, { attachments });
  log.info("➡ Sent message with media");

  if (!documents.length) return;

  for (const doc of documents) {
    try {
  
      const upload = await bot.api.upload.file({ source: doc.buffer });

      const fileAttachment = new FileAttachment({ token: upload.token }).toJson();
    
      await bot.api.sendMessageToChat(chatId, `📄 ${doc.filename}`, {
        attachments: [fileAttachment],
      });

      log.info(`➡ Sent document: ${doc.filename}`);
    } catch (e) {
      log.error(`❌ Failed to send document ${doc.filename}`, e);
    }
  }
}
