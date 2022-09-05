import { useEffect, useState } from 'react';
import { EventProps, UserProps } from '../../types/Props';
import { Button } from 'react-bootstrap';
import RequestForm from './RequestForm';
import TimeRequestTable from './TimeRequestTable';
import { convertApptFromBackToFront } from '../../utils/MidEnd/ApptUtils';

const RequestPage: React.FC<UserProps> = (user: UserProps) => {
  const [timeRequests, setTimeRequests] = useState<EventProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pageReload, setPageReload] = useState(false);
  const [displayNames, setDisplayNames] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    fetch(`/appts/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeRequests(data.map((user: any) => convertApptFromBackToFront(user)));
      });
    fetch('/users/names')
      .then((response) => response.json())
      .then((data) => {
        setDisplayNames(data);
      });
  }, [pageReload]);
  return (
    <>
      <h2>{user.firstname}'s Time Requests</h2>
      <Button variant='primary' onClick={() => setShowModal(true)}>
        New Request
      </Button>
      <br />
      <br />
      <TimeRequestTable
        requests={timeRequests}
        pageReload={pageReload}
        setPageReload={setPageReload}
        admin={false}
        displayNames={displayNames}
      />
      <RequestForm
        userid={user.id || ''}
        showModal={showModal}
        setShowModal={setShowModal}
        pageReload={pageReload}
        setPageReload={setPageReload}
        displayNames={displayNames}
      />
    </>
  );
};

export default RequestPage;
