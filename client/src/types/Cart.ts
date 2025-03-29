import Celebrity from "./Celebrity";
import { Charity } from "./Charity";
import { ClubMembership } from "./ClubMembership";
import { Fan } from "./Fan";
import { Souvenir } from "./Souvenir";
import { Ticket } from "./Ticket";
import { Tour } from "./Tour";

export type Cart = {
    celebrityId:number
    fanId: number
    itemType: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
    itemId: number;
    celebrity:Celebrity
    fan:Fan
    item:ClubMembership | Charity| Ticket | Souvenir | Tour;
}