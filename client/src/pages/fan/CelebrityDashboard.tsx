// src/pages/Index.tsx
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import { Badge, Button, Offcanvas } from "react-bootstrap";
import DashboardBar from "../../components/DashboardBar";
import Logo from "../../components/Logo";
import Notifications from "../../components/Notifications";
import { getGreeting } from "../../utils/utils";
import returnCelebrityDashboardNavItems from "../../helpers/returnCelebrityDashboardNavItems";
import { useJob } from "../../hooks/useJobs";






const notifications = [
  {
    id: 1,
    message: "Your profile has been updated successfully.",
    timestamp: "2025-01-11T10:30:00",
  },
  {
    id: 2,
    message: "New message from John Doe.",
    timestamp: "2025-01-12T15:45:00",
  },
  {
    id: 3,
    message: "Your subscription will expire in 3 days.",
    timestamp: "2025-01-10T08:20:00",
  },
  {
    id: 4,
    message: "You have successfully logged in from a new device.",
    timestamp: "2025-01-11T14:05:00",
  },
  {
    id: 5,
    message: "System maintenance scheduled for January 15th.",
    timestamp: "2025-01-09T18:00:00",
  },
];

//CART POSITION

const CelbrityDashboard: React.FC= () => {
  const fanId=1
  const celebrityId=1
  const [showSidebar, setShowSidebar] = useState(false);
  
const [showModal,setShowModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const toggleNotifications = () => setShowNotifications((prev) => !prev);

  const [component, setComponent] = useState<ReactNode|null>(null);
  const {job} = useJob(fanId,celebrityId)
  const clickHandler = (component:ReactNode) => {
    // if (chat.responseStatus!=='replied' && component !== <ChatMessages fanId={fanId} celebrityId={celebrityId}/>) {
    //   setShowModal(true)
    //   alert('hi')
    //   return
    // }
    setComponent(component)
  }
 if (!job){
  return 
 }
  const props = returnCelebrityDashboardNavItems(job,clickHandler)
 
  return (
    <div className=" min-vh-100 bg-light ">
      <div className="d-flex w-100  justify-content-between">
        <FontAwesomeIcon
          className="d-lg-none"
          icon={faBars}
          onClick={toggleSidebar}
          role="button"
          aria-label="Toggle Sidebar"
          size="2x"
        />
     <div className="d-flex justify-content-center justify-content-lg-end w-50 ">
  <Logo />
</div>
        <div className="d-flex">
          <Button onClick={toggleNotifications} variant="link" className="p-0">
            <FontAwesomeIcon icon={faBell} size="lg" />
          </Button>
          {notifications.length > 0 && (
           
           <div className="d-flex justify-content-center align-items-center notification-badge-container">
           <Badge pill bg="danger">
             +{notifications.length}
           </Badge>
         </div>

          )}
        </div>
      </div>


      <div className="d-flex">
        <div className="d-none d-lg-block w-25">
          <DashboardBar props={props} />
        </div>

        {/* Toggleable Sidebar for small screens */}

        <Offcanvas show={showSidebar} onHide={toggleSidebar} className="d-lg-none ">

          <Offcanvas.Header closeButton>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <DashboardBar props={props} />
          </Offcanvas.Body>
        </Offcanvas>

       <div >
        <div className="mt-2 mb-4">
          <p className="mb-0">{`${getGreeting()},`}</p>
          <h6 className="fw-bold text-dark">{'Nnamdi'}</h6>
        </div>
        {component}
      </div>
</div>
      <Notifications show={showNotifications} onClose={() => setShowNotifications(false)} notifications={notifications} />

    </div >
  );
};

export default CelbrityDashboard;
;
