import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { UNEXPECT_ALERT_TEXT } from '../../types/Constants';
import { EventProps } from '../../types/Props';
import { deleteAppt, updateAppt } from '../../utils/MiddleEnd';
import RequestForm from './RequestForm';

interface TimeRequestProps {
  request: EventProps;
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
  admin: boolean;
}
const TimeRequest: React.FC<TimeRequestProps> = ({
  request,
  pageReload,
  setPageReload,
  admin
}: TimeRequestProps) => {
  const [showModal, setShowModal] = useState(false);
  async function cancelRequest() {
    const result = await deleteAppt(request.id || '');
    if (!result) {
      alert(UNEXPECT_ALERT_TEXT);
    }
    setPageReload(!pageReload);
  }
  async function approveRequest() {
    request.approved = true;
    const result = await updateAppt(request);
    if (!result) {
      alert(UNEXPECT_ALERT_TEXT);
    }
    setPageReload(!pageReload);
  }
  return (
    <tr>
      <td aria-label='Day'>{new Date(request.start).toLocaleDateString()}</td>
      <td aria-label='Start'>{new Date(request.start).toLocaleTimeString()}</td>
      <td aria-label='End'>{new Date(request.end).toLocaleTimeString()}</td>
      <td aria-label='Guests'>{request.ownerid}</td>
      <td aria-label='Status'>{request.approved ? 'upcoming' : 'awaiting approval'}</td>
      <td aria-label='Actions'>
        <Button onClick={cancelRequest} variant='outline-danger'>
          {admin ? 'Deny' : 'Cancel'}
        </Button>
        {admin ? (
          <Button onClick={approveRequest} variant='outline-success'>
            Approve
          </Button>
        ) : (
          <Button onClick={() => setShowModal(true)} variant='outline-primary'>
            Edit
          </Button>
        )}
      </td>
      <RequestForm
        userid={request.ownerid}
        showModal={showModal}
        setShowModal={setShowModal}
        pageReload={pageReload}
        setPageReload={setPageReload}
        request={request}
      />
    </tr>
  );
};

export default TimeRequest;
