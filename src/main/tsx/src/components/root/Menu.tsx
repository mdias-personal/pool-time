import React from 'react';
import { NavDropdown, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserProps } from '../../types/Props';
import { AdminPage } from '../admin/AdminPage';
import CalendarPage from '../calendar/Calendar';
import RankingPage from '../scoreboard/RankingPage';
import RequestPage from '../timerequest/RequestPage';
import { UserPage } from '../user/UserPage';
import EventFeed from './EventFeed';

interface MenuProps {
  user: UserProps;
  setMainSection: Function;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
const Menu: React.FC<MenuProps> = ({
  user,
  setMainSection,
  expanded,
  setExpanded
}: MenuProps) => {
  return (
    <>
      <Navbar bg='light' expand='xl' className='mb-3' expanded={expanded}>
        <Container fluid>
          <Navbar.Brand>&#127946;</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-xl`}
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-x1 pe-3'>
                <Nav.Link onClick={() => setMainSection(<EventFeed {...user} />)}>
                  Home
                </Nav.Link>
                <Nav.Link onClick={() => setMainSection(<RequestPage {...user} />)}>
                  Time Requests
                </Nav.Link>
                <Nav.Link onClick={() => setMainSection(<CalendarPage {...user} />)}>
                  Calendar
                </Nav.Link>
                <Nav.Link onClick={() => setMainSection(<RankingPage {...user} />)}>
                  Score Board
                </Nav.Link>
                <NavDropdown
                  title='Dropdown'
                  id={`offcanvasNavbarDropdown-expand-xl`}
                >
                  <NavDropdown.Item
                    onClick={() => {
                      setMainSection(
                        <UserPage
                          login={false}
                          submitFunc={() => console.log('we need a submit function')}
                        />
                      );
                    }}
                  >
                    User Page
                  </NavDropdown.Item>
                  {user.admin ? (
                    <NavDropdown.Item onClick={() => setMainSection(<AdminPage />)}>
                      Admin page
                    </NavDropdown.Item>
                  ) : null}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => window.location.reload()}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
