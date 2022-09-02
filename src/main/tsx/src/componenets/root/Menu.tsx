import { useContext } from 'react';
import { NavDropdown, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserProps } from '../../types/Props';
import { AdminPage } from '../admin/AdminPage';
import CalendarPage from '../calendar/Calendar';
import RequestPage from '../timerequest/RequestPage';
import { UserPage } from '../user/UserPage';
import EventFeed from './EventFeed';

function Menu(props: {
  user: UserProps;
  setShowToast: Function;
  setMainSection: Function;
}) {
  console.log(props.user);
  return (
    <>
      <Navbar bg="light" expand="xl" className="mb-3" collapseOnSelect>
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
                Menu
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
                <Nav.Link
                  onClick={() =>
                    props.setMainSection(<RequestPage {...props.user} />)
                  }
                >
                  Time Requests
                </Nav.Link>
                <Nav.Link
                  onClick={() =>
                    props.setMainSection(<CalendarPage {...props.user} />)
                  }
                >
                  Calendar
                </Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-xl`}
                >
                  <NavDropdown.Item
                    onClick={() => {
                      props.setMainSection(
                        <UserPage
                          login={false}
                          submitFunc={() =>
                            console.log('we need a submit function')
                          }
                        />
                      );
                    }}
                  >
                    User Page
                  </NavDropdown.Item>
                  {props.user.admin ? (
                    <NavDropdown.Item
                      onClick={() => props.setMainSection(<AdminPage />)}
                    >
                      Admin page
                    </NavDropdown.Item>
                  ) : null}
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Sign out</NavDropdown.Item>
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
