import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { EventProps, UserProps } from '../../types/Props';
import {
  convertApptFromBackToFront,
  convertUserFromBackToFront
} from '../../utils/MiddleEnd';
import TimeRequest from '../timerequest/TimeRequest';
import UserRequest from '../user/UserRequest';

export const AdminPage = () => {
  const [timeRequests, setTimeRequests] = useState<EventProps[]>([]);
  const [userRequests, setUserRequests] = useState<UserProps[]>([]);
  const [pageReload, setPageReload] = useState(true);
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
  }, [pageReload]);
  useEffect(() => {
    fetch('/appts')
      .then((response) => response.json())
      .then((data) => {
        setTimeRequests(
          data
            .map((appt: any) => convertApptFromBackToFront(appt))
            .filter((appt: EventProps) => !appt.approved)
        );
      });
  }, [pageReload]);
  return (
    <Accordion>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>User Requests ({userRequests.length})</Accordion.Header>
        <Accordion.Body>
          <ul>
            {userRequests.map((request) => {
              return (
                <li>
                  <UserRequest
                    request={request}
                    pageReload={pageReload}
                    setPageReload={setPageReload}
                  />
                </li>
              );
            })}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='1'>
        <Accordion.Header>Time Requests ({timeRequests.length})</Accordion.Header>
        <Accordion.Body>
          <ul>
            {timeRequests.map((request) => {
              return (
                <li>
                  <TimeRequest
                    request={request}
                    pageReload={pageReload}
                    setPageReload={setPageReload}
                    admin={true}
                  />
                </li>
              );
            })}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
