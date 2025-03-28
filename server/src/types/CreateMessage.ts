export type CreateMessage ={
    content: string,
    chatId: number,
    senderId: number,
    mediaType:'text'|'video'|'voice',
    mediaUrl?:string,
    isSeen:boolean,
}