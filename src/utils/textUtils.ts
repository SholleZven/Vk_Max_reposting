import { VKPost, VKAttachment } from "../core/types";

export function buildMessage(post: VKPost): string {
  let text = post.text;

  if (post.copy_history?.length) {
    const repost = post.copy_history[0];
    const link = `https://vk.com/wall${repost.from_id}_${repost.id}`;
    text += `\n\nREPOST: ${link}`;
  }

  return text;
}

export function extractMedia(post: VKPost): string[] {
  const media: string[] = [];

  if (!post.attachments) return media;

  for (const att of post.attachments) {
    if (att.type === "photo") {
      const largest = att.photo.sizes.sort((a, b) => b.width - a.width)[0];
      if (largest?.url) media.push(largest.url);
    }

    if (att.type === "video") {
      const video = att.video;
      const link = video.access_key
        ? `https://vk.com/video${video.owner_id}_${video.id}_${video.access_key}`
        : `https://vk.com/video${video.owner_id}_${video.id}`;
      media.push(link);
    }

    if (att.type === "link") {
      media.push(att.link.url);
    }
  }

  return media;
}