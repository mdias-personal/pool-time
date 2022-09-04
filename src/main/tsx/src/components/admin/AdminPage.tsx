import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { EventProps, UserProps } from '../../types/Props';
import {
  convertApptFromBackToFront,
  convertUserFromBackToFront
} from '../../utils/MiddleEnd';
import TimeRequestTable from '../timerequest/TimeRequestTable';
import UserRequestTable from '../user/UserRequestTable';

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
          <UserRequestTable
            requests={userRequests}
            pageReload={pageReload}
            setPageReload={setPageReload}
            admin={true}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='1'>
        <Accordion.Header>Time Requests ({timeRequests.length})</Accordion.Header>
        <Accordion.Body>
          <TimeRequestTable
            requests={timeRequests}
            pageReload={pageReload}
            setPageReload={setPageReload}
            admin={true}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
