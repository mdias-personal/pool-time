import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { UNEXPECT_ALERT_TEXT } from '../../types/Constants';
import { EventProps } from '../../types/Props';
import { deleteAppt, updateAppt } from '../../utils/MidEnd/ApptUtils';
import PopoverTableData from '../common/PopoverTableData';
import RequestForm from './RequestForm';

interface TimeRequestProps {
  request: EventProps;
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
  admin: boolean;
  displayNames: { [id: string]: string };
}
const TimeRequest: React.FC<TimeRequestProps> = ({
  request,
  pageReload,
  setPageReload,
  admin,
  displayNames
}: TimeRequestProps) => {
  const [showFormModal, setFormShowModal] = useState(false);
  async function cancelRequest() {
    const result = await deleteAppt(request.id || '');
    if (!result) {
      alert(UNEXPECT_ALERT_TEXT);
    }
    setPageReload(!pageReload);
  }
  async function approveRequest() {
    request.approved = true;
    const result = await updateAppt(request, 'APPROVE');
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
      <PopoverTableData
        title='Guests'
        items={[displayNames[request.ownerid.toString()]]}
      />
      <PopoverTableData title='Snacks' items={[]} />
      <td aria-label='Status'>{request.approved ? 'approved' : 'pending'}</td>
      <td aria-label='Actions'>
        <Button onClick={cancelRequest} variant='outline-danger'>
          {admin ? 'Deny' : 'Cancel'}
        </Button>
        {admin ? (
          <Button onClick={approveRequest} variant='outline-success'>
            Approve
          </Button>
        ) : (
          <Button onClick={() => setFormShowModal(true)} variant='outline-primary'>
            Edit
          </Button>
        )}
      </td>
      <RequestForm
        userid={request.ownerid}
        showModal={showFormModal}
        setShowModal={setFormShowModal}
        pageReload={pageReload}
        setPageReload={setPageReload}
        request={request}
        displayNames={displayNames}
      />
    </tr>
  );
};

export default TimeRequest;
