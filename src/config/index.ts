import dotenv from "dotenv";
dotenv.config();

export default {
  TG_CHANNEL: process.env.VAR_TG_CHANNEL || "",
  MAX_BOT_TOKEN: process.env.MAX_BOT_TOKEN || "",
  MAX_CHANNEL_ID: Number(process.env.MAX_CHANNEL_ID) || 0,

  VK_TOKEN: process.env.VAR_VK_TOKEN || "",
  VK_DOMAIN: process.env.VAR_VK_DOMAIN || "",
  REQ_VERSION: Number(process.env.VAR_REQ_VERSION) || 5.131,
  REQ_COUNT: Number(process.env.VAR_REQ_COUNT) || 3,
  REQ_FILTER: process.env.VAR_REQ_FILTER || "owner",

  SINGLE_START: process.env.VAR_SINGLE_START === "true",
  TIME_TO_SLEEP: Number(process.env.VAR_TIME_TO_SLEEP) || 120,

  SKIP_ADS_POSTS: process.env.VAR_SKIP_ADS_POSTS === "true",
  SKIP_COPYRIGHTED_POST: process.env.VAR_SKIP_COPYRIGHTED_POST === "true",
  SKIP_REPOSTS: process.env.VAR_SKIP_REPOSTS === "true",

  WHITELIST: JSON.parse(process.env.VAR_WHITELIST || "[]"),
  BLACKLIST: JSON.parse(process.env.VAR_BLACKLIST || "[]"),
};
