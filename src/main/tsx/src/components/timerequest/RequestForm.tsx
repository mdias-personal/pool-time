import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { EventProps } from '../../types/Props';
import { addNewAppt, updateAppt } from '../../utils/MidEnd/ApptUtils';
import { getDateFromAppt, getTimeFromAppt } from '../../utils/Misc';

interface RequestFormProps {
  userid: String;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
  request?: EventProps;
}
const RequestForm: React.FC<RequestFormProps> = ({
  userid,
  showModal,
  setShowModal,
  pageReload,
  setPageReload,
  request
}: RequestFormProps) => {
  const [day, setDay] = useState(getDateFromAppt(request));
  const [start, setStart] = useState(getTimeFromAppt(true, request));
  const [end, setEnd] = useState(getTimeFromAppt(false, request));

  async function handleSubmit() {
    const args = {
      ownerid: userid,
      start: new Date(day + ' ' + start),
      end: new Date(day + ' ' + end)
    } as EventProps;
    typeof request !== 'undefined'
      ? await updateAppt({ ...args, approved: false, id: request.id })
      : await addNewAppt(args);
    setPageReload(!pageReload);
    setShowModal(false);
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>New Time Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>every new request or edit needs to be reviewed and approved by Lou</span>
        <table>
          <tr>
            <td>
              <label htmlFor='day'>Day</label>
            </td>
            <td>
              <input
                type='date'
                id='day'
                defaultValue={day}
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor='start'>Start</label>
            </td>
            <td>
              <input
                type='time'
                id='start'
                defaultValue={start}
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor='end'>Start</label>
            </td>
            <td>
              <input
                type='time'
                id='end'
                defaultValue={end}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </td>
          </tr>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => handleSubmit()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default RequestForm;
