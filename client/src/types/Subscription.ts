import Celebrity from "./Celebrity";
import { ClubMembership } from "./ClubMembership";
import { Fan } from "./Fan";

export type Subscription =  {
    id: number;
    celebrityId:number
    celebrity:Celebrity
    fanId:number
    fan:Fan
    dateOflastPayment:Date;
    item:ClubMembership
    status:'In Transit'| 'Active'|'Pending'|'expired'
    isMax:boolean|null
    durationInDays:number|null
  }
