import { useEffect, useState } from 'react';
import { convertApptFromBackToFront } from '../../utils/MiddleEnd';
import { EventProps, UserProps } from '../../types/Props';
import { Button, Modal } from 'react-bootstrap';
import NewRequest from './NewRequest';

function RequestPage(user: UserProps): JSX.Element {
  const [timeRequests, setTimeRequests] = useState<EventProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(`/appts/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeRequests(
          data.map((user: any) => convertApptFromBackToFront(user))
        );
      });
  }, []);
  return (
    <>
      <h2>{user.firstname}'s Time Requests</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        New Request
      </Button>
      <ul>
        {timeRequests.map((request) => {
          return (
            <li>
              <p>{request.approved ? 'upcoming' : 'awaiting approval'}</p>
            </li>
          );
        })}
      </ul>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Time Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewRequest userid="userid"/>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RequestPage;
