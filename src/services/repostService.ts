import { getPostsFromVK } from "./vkService";
import { buildMessage } from "../utils/textUtils";
import { sendMessageToMax } from "../bot/maxBot";
import { readLastId, writeLastId } from "../utils/lastId";
import { VKPost } from "../core/types";
import config from "../config";

export async function repostFromVK() {
  const posts: VKPost[] = await getPostsFromVK();
  if (!posts.length) return;

  let lastId = readLastId();
  const newLastId = posts[0].id;

  for (const post of posts.reverse()) {
    if (post.id <= lastId) continue;
    if (config.SKIP_ADS_POSTS && post.marked_as_ads) continue;
    if (config.SKIP_COPYRIGHTED_POST && post.copyright) continue;

    const message = buildMessage(post);
    await sendMessageToMax(message);
  }

  writeLastId(newLastId);
}
