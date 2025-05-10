

export type Message = {
    id: number;
    sender:'fan'|'celebrity';
    content: string;
    mediaType: "text" | "video" | "voice" | "image";
    mediaUrl: string | null;
    isSeen: boolean;
    createdAt: Date;
    chatId:number
  }
  