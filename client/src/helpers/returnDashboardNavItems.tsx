import { faTeamspeak } from "@fortawesome/free-brands-svg-icons"
import { faUser, faUsersRays, faUsers, faGifts, faDollar, faFighterJet, faLocation } from "@fortawesome/free-solid-svg-icons"
import Interactions from "../components/Interactions"
import MyBookedEvents from "../components/MyBookedEvents"
import MyClubMembership from "../components/MyClubMembership"
import MyDonationCampaigns from "../components/MyDonationCampaigns"
import MyTours from "../components/MyTours"
import NeverToBe from "../components/NeverToBe"
import Profile from "../components/Profile"

import Shoutout from "../pages/fan/Shoutout"
import { ReactNode } from "react"
import MySouvenirs from "../components/MySouvenirs"


const returnDashboardNavItems = (id:number,clickHandler:(component:ReactNode)=>void) =>{
    return{
        navItems:[
            
            { title: "Make a shoutout", icon: faTeamspeak, component: <Shoutout id={id}/> },
            { title: "Profile", icon: faUser, component: <Profile id={id}/> },
            { title: "My Interactions", icon: faUsersRays, component: <Interactions id={id}/> },
            { title: "Clubs I belong To", icon: faUsers, component: <MyClubMembership id={id}/> },
            { title: "Souvenirs I've Received", icon: faGifts, component: <MySouvenirs id={id}/> },
            { title: "Charity Campaigns I've supported", icon: faDollar, component: <MyDonationCampaigns id={id}/>},
            { title: "Previous Exclusive Personalised Tours", icon: faFighterJet, component:<NeverToBe title="past tours."/> },
            { title: "Booked Exclusive Personalised Tours", icon: faFighterJet, component:<MyTours id={id}/> },
            { title: "Previous Events I've Attended", icon: faDollar, component: <NeverToBe title="events attended."/>,},
            { title: "Events I am to attend", icon: faLocation, component: <MyBookedEvents id={id}/> },
          ],
          clickHandler: clickHandler
        
    }
}
export default returnDashboardNavItems