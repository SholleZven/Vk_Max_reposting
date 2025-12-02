export interface VKAttachmentPhoto {
  type: "photo";
  photo: { sizes: { url: string; width: number; height: number }[] };
}

export interface VKAttachmentVideo {
  type: "video";
  video: {
    owner_id: number;
    id: number;
    access_key?: string;
    type?: string;
  };
}

export interface VKAttachmentLink {
  type: "link";
  link: { url: string };
}

export type VKAttachment = VKAttachmentPhoto | VKAttachmentVideo | VKAttachmentLink;

// Основной пост
export interface VKPost {
  id: number;
  owner_id: number;        // владелец поста
  from_id?: number;        // автор репоста
  text: string;
  attachments?: VKAttachment[];
  copy_history?: VKRepost[]; // элементы репоста
  marked_as_ads?: boolean;
  copyright?: any;
}

// Репост
export interface VKRepost {
  id: number;
  owner_id: number;
  from_id?: number;
  text: string;
  attachments?: VKAttachment[];
}
