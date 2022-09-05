import { useEffect, useState } from 'react';
import { EventProps, UserProps } from '../../types/Props';
import { Button } from 'react-bootstrap';
import RequestForm from './RequestForm';
import TimeRequestTable from './TimeRequestTable';
import { convertApptFromBackToFront } from '../../utils/MidEnd/ApptUtils';

function RequestPage(user: UserProps): JSX.Element {
  const [timeRequests, setTimeRequests] = useState<EventProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pageReload, setPageReload] = useState(false);

  useEffect(() => {
    fetch(`/appts/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeRequests(data.map((user: any) => convertApptFromBackToFront(user)));
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
      />
      <RequestForm
        userid={user.id || ''}
        showModal={showModal}
        setShowModal={setShowModal}
        pageReload={pageReload}
        setPageReload={setPageReload}
      />
    </>
  );
}

export default RequestPage;
