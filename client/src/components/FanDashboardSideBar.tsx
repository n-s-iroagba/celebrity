import { faTeamspeak } from "@fortawesome/free-brands-svg-icons";
import { faUser, faUsersRays, faGifts, faUsers, faFighterJet, faDollar, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JSX } from "react";
import { Navbar, Nav } from "react-bootstrap";

const id = 1
 
 const navigationItems = [
  { title: "Make a shoutout", icon: <FontAwesomeIcon icon={faTeamspeak} />, url: "/book/all/shout-out" },
  { title: "Profile", icon: <FontAwesomeIcon icon={faUser} />, url: "/profile" },
  { title: "My Interactions", icon: <FontAwesomeIcon icon={faUsersRays} />, url: "/interactions" },
  { title: "My Club Memberships", icon: <FontAwesomeIcon icon={faUsers} />, url: `/my-club-membership/:${id}` },
  { title: "My Purchased Souvenirs", icon: <FontAwesomeIcon icon={faGifts} />, url: `/my-souvenirs/:${id}` },
  { title: "My Book Celebrity ShadowingTours", icon: <FontAwesomeIcon icon={faFighterJet} />, url: `/my-tours/:${id}` },
  { title: "My Supported Donation Campaigns", icon: <FontAwesomeIcon icon={faDollar} />, url: `/my-donations/:${id}` },
  { title: "My Events of Interest", icon: <FontAwesomeIcon icon={faLocation} />, url: `/my-tours/:${id}` },
  { title: "Trending News", icon: <FontAwesomeIcon icon={faTeamspeak} />, url: `/news` },
];
 function FanDashboardSidebar(): JSX.Element {
  return (
    <Navbar bg="light" className="flex-column align-items-start p-3" style={{ height: "100vh" }}>
      <Navbar.Brand className="mb-4">Actions</Navbar.Brand>
      <Nav className="flex-column w-100">
        {navigationItems.map((item) => (
          <Nav.Link
            key={item.title}
            href={item.url}
            className="d-flex align-items-center gap-2 text-dark"
          >
            {item.icon}
            <span>{item.title}</span>
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
}
export default FanDashboardSidebar;