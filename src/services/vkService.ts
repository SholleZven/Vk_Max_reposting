import axios from "axios";
import { log } from "../core/logger";
import config from "../config";
import { VKPost } from "../core/types";

export async function getPostsFromVK(): Promise<VKPost[]> {
  const { VK_TOKEN, VK_DOMAIN, REQ_VERSION, REQ_FILTER, REQ_COUNT } = config;

  const ownerMatch = VK_DOMAIN.match(/^(club|public)(\d+)$/);
  const params: any = {
    access_token: VK_TOKEN,
    v: REQ_VERSION,
    filter: REQ_FILTER,
    count: REQ_COUNT,
  };

  if (ownerMatch) params.owner_id = "-" + ownerMatch[2];
  else params.domain = VK_DOMAIN;

  try {
    const res = await axios.get("https://api.vk.com/method/wall.get", { params });
    if (res.data.response) return res.data.response.items;
    if (res.data.error) log.error(`VK Error: ${res.data.error.error_msg}`);
  } catch (e) {
    log.error("Failed to fetch VK posts: " + e);
  }
  return [];
}
