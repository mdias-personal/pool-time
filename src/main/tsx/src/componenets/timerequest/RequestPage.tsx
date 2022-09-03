import { useEffect, useState } from 'react';
import { convertApptFromBackToFront } from '../../utils/MiddleEnd';
import { EventProps, UserProps } from '../../types/Props';
import { Button } from 'react-bootstrap';
import NewRequest from './NewRequest';
import TimeRequest from './TimeRequest';

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
      <ul>
        {timeRequests.map((request) => {
          return (
            <li>
              <TimeRequest
                request={request}
                pageReload={pageReload}
                setPageReload={setPageReload}
                admin={false}
              />
            </li>
          );
        })}
      </ul>
      <NewRequest
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
