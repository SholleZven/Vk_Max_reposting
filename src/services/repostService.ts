import { getPostsFromVK } from "./vkService";
import { buildMessage, extractMedia } from "../utils/textUtils";
import { sendMessageToMax } from "../bot/maxBot";
import { readLastId, writeLastId } from "../utils/lastId";
import { VKPost } from "../core/types";
import config from "../config";
import { log } from "../core/logger";

export async function repostFromVK() {
  const posts: VKPost[] = await getPostsFromVK();
  if (!posts.length) return;

  let lastId = readLastId();
  const filteredPosts = posts.filter(post => post.is_pinned !== 1);
  const newPosts = filteredPosts.filter(post => post.id > lastId);

  if (!newPosts.length) {
    log.info("No new posts found");
    return;
  }

  newPosts.sort((a, b) => a.id - b.id);

  let maxProcessedId = lastId;


  for (const post of posts.reverse()) {
    if (post.id <= lastId) continue;
    if (config.SKIP_ADS_POSTS && post.marked_as_ads) continue;
    if (config.SKIP_COPYRIGHTED_POST && post.copyright) continue;

    const message = buildMessage(post);
    const media = extractMedia(post);

    const result = media.length ? [media[0]] : []; // на время пока API поддерживет только одно вложение

    await sendMessageToMax(message, result);

    if (post.id > maxProcessedId) {
      maxProcessedId = post.id;
    }
  }

  if (maxProcessedId > lastId) {
    writeLastId(maxProcessedId);
  }

}
