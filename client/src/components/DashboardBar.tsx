
import { Navbar, Nav } from "react-bootstrap";
import React, { ReactNode }  from "react";
import { NavItem } from "../types/NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface DashboardBarProps {
  props:{navItems:NavItem[],clickHandler:(component:ReactNode)=>void}

}

const DashboardBar: React.FC<DashboardBarProps> = ({ props}) => {


  return (
    <Navbar bg="light" className="flex-column align-items-start p-3" style={{ height: "100vh" }}>
      <Navbar.Brand className="mb-4">Actions</Navbar.Brand>
      <Nav className="flex-column w-100">
        {props.navItems.map((item) => (
          <Nav.Link
            key={item.title}
            onClick={() => props.clickHandler(item.component)}
            className="d-flex align-items-center gap-2 "
          >
            <FontAwesomeIcon icon = {item.icon}/>
            <span>{item.title}</span>
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
};

export default DashboardBar;
