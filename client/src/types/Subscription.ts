import Celebrity from "./Celebrity";
import { Charity } from "./Charity";
import { ClubMembership } from "./ClubMembership";
import { Fan } from "./Fan";
import { Souvenir } from "./Souvenir";
import { Ticket } from "./Ticket";
import { Tour } from "./Tour";

export type Subscription =  {
    id: number;
    celebrityId:number
    celebrity:Celebrity
    fanId:number
    fan:Fan
    dateOflastPayment:Date;
    item:ClubMembership|Charity|Ticket|Souvenir|Tour
    status:'In Transit'| 'Active'|'Pending'|'expired'
    isMax:boolean|null
    durationInDays:number|null
  }