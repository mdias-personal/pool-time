import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { EventProps, UserProps, SnackProps } from '../../types/Props';
import { convertApptFromBackToFront } from '../../utils/MidEnd/ApptUtils';
import { convertUserFromBackToFront } from '../../utils/MidEnd/UserUtils';
import TimeRequestTable from '../timerequest/TimeRequestTable';
import UserRequestTable from '../user/UserRequestTable';

const AdminPage: React.FC = () => {
  const [timeRequests, setTimeRequests] = useState<EventProps[]>([]);
  const [userRequests, setUserRequests] = useState<UserProps[]>([]);
  const [pageReload, setPageReload] = useState(true);
  const [displayNames, setDisplayNames] = useState<{ [id: string]: string }>({});
  const [snacks, setSnacks] = useState<SnackProps[]>([]);

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
    fetch('/appts')
      .then((response) => response.json())
      .then((data) => {
        setTimeRequests(
          data
            .map((appt: any) => convertApptFromBackToFront(appt))
            .filter((appt: EventProps) => !appt.approved)
        );
      });
    fetch('/users/names')
      .then((response) => response.json())
      .then((data) => {
        setDisplayNames(data);
      });
    fetch('/snacks')
      .then((response) => response.json())
      .then((data) => {
        setSnacks(data);
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
            displayNames={displayNames}
            allSnacks={snacks}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
export default AdminPage;
