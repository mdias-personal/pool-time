import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { EventProps, UserProps } from '../../types/Props';
import { convertUserFromBackToFront } from '../../utils/MiddleEnd';
import { UserRequest } from './UserRequest';

export const AdminPage = () => {
  const [timeRequests, setTimeRequests] = useState<EventProps[]>([]);
  const [userRequests, setUserRequests] = useState<UserProps[]>([]);
  const [pageReload, setPageReload] = useState(false);
  useEffect(() => {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => {
        setUserRequests(
          data
            .map((user: any) => convertUserFromBackToFront(user))
            .filter((user: UserProps) => !user.approved)
        );
      });
  }, []);
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          User Requests ({userRequests.length})
        </Accordion.Header>
        <Accordion.Body>
          <ul>
            {userRequests.map((request) => {
              return (
                <li>
                  <UserRequest
                    request={request}
                    pageReload={() => setPageReload(!pageReload)}
                  />
                </li>
              );
            })}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Time Requests</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
