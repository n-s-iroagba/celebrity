
import { faUsersRays, faUsers, faGifts, faDollar, faFighterJet, faLocation } from "@fortawesome/free-solid-svg-icons"

import { ReactNode } from "react"
import { CelebrityClubMembership } from "../components/CelebrityClubMembership"
import CelebritySouvenirs from "../components/CelebritySouvenir"
import CelebrityTourPackages from "../components/CelebrityTours"
import ChatMessages from "../components/ChatMessages"
import CelebrityEvent from "../components/CelebrityEvent"
import { Job } from "../types/Job"
import CharityCampaigns from "../components/CharityCampaigns"

const returnCelebrityDashboardNavItems = (job:Job,clickHandler:(component:ReactNode)=>void,fanId:number) =>{
    return{
        navItems:[
          
           
            { title: "Chat", icon: faUsersRays, component: <ChatMessages messages={job.chat.messages } userId={fanId}/> },
            { title: "Fan Club Packages", icon: faUsers, component: <CelebrityClubMembership packages={job.clubMembershipsPackages} /> },
            { title: "Souvenirs I've Received", icon: faGifts, component: <CelebritySouvenirs souvenirs = {job.souvenirs}/> },
            { title: "Charity Campaigns I've supported", icon: faDollar, component: <CharityCampaigns campaigns={job.charityCampaigns} /> },
            { title: "Booked Exclusive Personalised Tours", icon: faFighterJet, component:<CelebrityTourPackages tours={job.tourPackages} /> },
            { title: "Events I am to attend", icon: faLocation, component: <CelebrityEvent events= {job.events}/> },
          
          ],
          clickHandler: clickHandler
        
    }
}
export default returnCelebrityDashboardNavItems