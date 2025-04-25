import { Navbar, Container, Nav } from "react-bootstrap"
import './NavbarComponent.css'

type NavbarComponentProps = {
    scrollToHowItWorks?: () => void
}


const NavbarComponent: React.FC<NavbarComponentProps> = ({ scrollToHowItWorks }) => {
    return <>

        <Navbar
            expand="lg"
            bg="light"
            className="pt-3 custom-navbar w-100"
        >
            <Container fluid>
                <div className="d-flex justify-content-between w-100">
                    <Navbar.Brand href="/" className="fs-2">
                        Vercel Celebrity Connect
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" className="border-0 " />
                </div>

                <Navbar.Collapse id="navbar-nav" className="">
                    <Nav>
                        <Nav.Link href="/login">
                            Login
                        </Nav.Link>
                        <Nav.Link
                            onClick={scrollToHowItWorks}
                        >
                            How It Works
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}

export default NavbarComponent