
import { CharityCampaign } from "./CharityCampaign";
import { ClubMembership } from "./ClubMembership";
import { Message } from "./Messages";
import { Souvenir } from "./Souvenir";
import { TourPackage } from "./TourPackage";

export interface Job {
    id: number;
    title: string;
    fanId:string;
    clientId:string
    chat:{
      messages:Message[]
    }
    tourPackages: TourPackage[];
    clubMembershipsPackages: ClubMembership[];
    souvenirs:Souvenir[]
    charityCampaigns: CharityCampaign[]
    events:Event[]
  }