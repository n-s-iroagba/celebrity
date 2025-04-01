import { MediaType } from "./MediaType"


export type SendShoutout = {
    mediaType:MediaType
    content: File|string
}