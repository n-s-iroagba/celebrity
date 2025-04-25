import React, { ReactNode, useState } from "react";
import { Offcanvas, Nav, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCommentDots,
  faPhoneAlt,
  faPeopleGroup,
  faLocationPin,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faMeetup } from "@fortawesome/free-brands-svg-icons";

import NeverToBe from "./NeverToBe";
import Profile from "./Profile";


const DashboardBar: React.FC<{ clickHandler: (component: ReactNode) => void; id: number,show?:boolean,setShow?:any }> = ({ 
  clickHandler, 
  show,
  id,setShow
}) => {


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clubMembershipItems = [
    { title: "My Club Membership", component: <SubscriptionsGroupedByCelebrity  /> },
    { title: "Apply for Club Membership", component: <ApplyClubMembership id={id}/> },
    { title: "My Pending Club Applications", component: <SubscriptionsGroupedByCelebrity/> },
  ];

  const meetAndGreetItems = [
    { title: "My Scheduled Meet And Greets", component:  <AppliedMeetGreetGroupedByCelebrity id={id}/> },
    { title: "Apply for Meet And Greets", component: <ApplyMeetGreet id={id}/> },
    { title: "My Pending Meet And Greet", component: <AppliedMeetGreetGroupedByCelebrity isPending id={id}/> },
    { title: "My Past Meet And Greets", component: <NeverToBe title="Meet an Greet"/> },
  ];

  const eventItems = [
    { title: "My Scheduled Event Bookings", component: <EventsGroupedByCelebrity id={id}/> },
    { title: "Apply for Event Bookings", component: <ApplyEvent id={id}/> },
    { title: "My Pending Event Booking Applications", component: <EventsGroupedByCelebrity isPending id={id}/> },
    { title: "My Past Event Booking", component: <NeverToBe title="Events"/> },
  ];

  const accordionStyle = `
    .accordion-button::after {
      position: absolute;
      right: 1.5rem;
      margin-left: 0;
      transition: transform 0.2s ease-in-out;
    }
    
    .accordion-button:not(.collapsed)::after {
      transform: rotate(-180deg);
    }

    .accordion-button {
      position: relative;
      padding-right: 3rem !important;
      background: white !important;
    }

    .accordion-button:focus {
      box-shadow: none !important;
    }

    .accordion-body {
      max-height: 300px;
      overflow-y: auto;
      transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-link-custom {
      color: #4B0082 !important;
      padding: 0.75rem 2rem;
      border-left: 3px solid transparent;
      transition: all 0.3s ease;
    }

    .nav-link-custom:hover {
      background: #f8f9fa !important;
      border-left-color: #8A2BE2;
      padding-left: 2.5rem;
    }
  `;

  return (
    <>
      <style>{accordionStyle}</style>



      {/* Sidebar */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="lg"
        style={{ width: '300px', backgroundColor: 'white' }}
        className="dashboard-sidebar"
      >
        <Offcanvas.Header 
          closeButton
          closeVariant="white"
          style={{
            backgroundColor: '#4B0082',
            borderBottom: '2px solid #8A2BE2'
          }}
        >
          <Offcanvas.Title style={{ color: 'white' }}>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body style={{ padding: '0' }}>
          <Nav className="flex-column">
            {/* Main Navigation */}
            <Nav.Link
              onClick={() => {clickHandler(<Profile id={id}/>);setShow(false)}}
              className=" d-flex align-items-center gap-2"
              style={{ color: '#4B0082' }}
            >
              <FontAwesomeIcon icon={faHome}  />
              <span>Profile</span>
            </Nav.Link>
            <Nav.Link onClick={() => clickHandler(<MessagesGroupedByCelebrity id={id}/>)} style={{ color: '#4B0082' }} className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faCommentDots} />
              <span>My Shoutouts</span>
            </Nav.Link>
            <Nav.Link onClick={() => clickHandler(<Profile id={id}/>)} style={{ color: '#4B0082' }} className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faPhoneAlt} />
              <span>Send New Messages</span>
            </Nav.Link>

            {/* Club Memberships Accordion */}
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="d-flex align-items-center gap-2" style={{ marginRight: '2rem' }}>
                    <FontAwesomeIcon icon={faPeopleGroup} />
                    <span>Club Memberships</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body style={{ padding: 0 }}>
                  {clubMembershipItems.map((item, index) => (
                    <Nav.Link
                      key={index}
                      onClick={() => {clickHandler(item.component); setShow(false)}}
                      className="nav-link-custom"
                    >
                      {item.title}
                    </Nav.Link>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Meet & Greets Accordion */}
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="d-flex align-items-center gap-2" style={{ marginRight: '2rem', width:'12rem' }}>
                    <FontAwesomeIcon icon={faMeetup} />
                    <span>Meet & Greets</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body style={{ padding: 0 }}>
                  {meetAndGreetItems.map((item, index) => (
                    <Nav.Link
                      key={index}
                      onClick={() => {clickHandler(item.component); setShow(false)}}
                      className="nav-link-custom"
                    >
                      {item.title}
                    </Nav.Link>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Event Bookings Accordion */}
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <div className="d-flex align-items-center gap-2" style={{ marginRight: '2rem' }}>
                    <FontAwesomeIcon icon={faLocationPin} />
                    <span>Event Bookings</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body style={{ padding: 0 }}>
                  {eventItems.map((item, index) => (
                    <Nav.Link
                      key={index}
                      onClick={() => {clickHandler(item.component); setShow(false)}}
                      className="nav-link-custom"
                    >
                      {item.title}
                    </Nav.Link>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DashboardBar;
