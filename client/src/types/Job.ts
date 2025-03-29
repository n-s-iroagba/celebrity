import {Charity } from "./Charity";
import { ClubMembership } from "./ClubMembership";
import { Souvenir } from "./Souvenir";
import { Tour } from "./Tour";
import { Event } from "./Event";
import Celebrity from "./Celebrity";
import { Fan } from "./Fan";
import { Chat } from "./Chat";
export interface Job {
    id: number;
    fanId:string;
    celebrityId:string;
    celebrity:Celebrity
    fan:Fan
    chat:Chat
    tours: Tour[];
    clubMemberships: ClubMembership[];
    souvenirs:Souvenir[]
   charities:Charity[]
    events:Event[]
  }