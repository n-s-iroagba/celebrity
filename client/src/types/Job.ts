
import { CharityCampaign } from "./CharityCampaign";
import { ClubMembership } from "./ClubMembership";
import { Message } from "./Messages";
import { Souvenir } from "./Souvenir";
import { Tour } from "./Tour";
import { Event } from "./Event";
import Celebrity from "./Celebrity";
import { Fan } from "./Fan";
import { Chat } from "./Chat";
export interface Job {
    id: number;
    title: string;
    fanId:string;
    clientId:string
    chat:Chat
    tourPackages: Tour[];
    clubMembershipsPackages: ClubMembership[];
    souvenirs:Souvenir[]
    charityCampaigns: CharityCampaign[]
    events:Event[]
    celebrity:Celebrity
    fan:Fan
  }