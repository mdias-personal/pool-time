import { useContext } from 'react';
import { NavDropdown, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserProps } from '../../types/Props';
import { AdminPage } from '../admin/AdminPage';
import EventFeed from './EventFeed';

function Menu(props: {
  user: UserProps;
  setShowToast: Function;
  setMainSection: Function;
}) {
  console.log(props.user);
  return (
    <>
      <Navbar bg="light" expand="xl" className="mb-3">
        <Container fluid>
          <Navbar.Brand>&#127946;</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-x1 pe-3">
                <Nav.Link
                  onClick={() =>
                    props.setMainSection(<EventFeed {...props.user} />)
                  }
                >
                  Home
                </Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-xl`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  {props.user.admin ? (
                    <NavDropdown.Item
                      onClick={() => props.setMainSection(<AdminPage />)}
                    >
                      Admin page
                    </NavDropdown.Item>
                  ) : null}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => props.setShowToast(true)}>
                    Show Toast
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;
