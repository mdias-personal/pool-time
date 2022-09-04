import { Button } from 'react-bootstrap';
import { UNEXPECT_ALERT_TEXT } from '../../types/Constants';
import { EventProps } from '../../types/Props';
import { deleteAppt, updateAppt } from '../../utils/MiddleEnd';

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
  async function cancelRequest() {
    console.log(request);
    const result = await deleteAppt(request.id || '');
    console.log(result);
    if (!result) {
      alert(UNEXPECT_ALERT_TEXT);
    }
    setPageReload(!pageReload);
  }
  async function approveRequest() {
    request.approved = true;
    const result = await updateAppt(request);
    console.log(result);
    if (!result) {
      alert(UNEXPECT_ALERT_TEXT);
    }
    setPageReload(!pageReload);
  }
  const status = request.approved ? 'upcoming' : 'awaiting approval';
  return (
    <>
      <p>{request.start + ' -> ' + request.end + ': ' + status}</p>
      <Button onClick={cancelRequest} variant='outline-danger'>
        {admin ? 'Deny' : 'Cancel'}
      </Button>
      {admin ? (
        <Button onClick={approveRequest} variant='outline-success'>
          Approve
        </Button>
      ) : null}
    </>
  );
};

export default TimeRequest;
