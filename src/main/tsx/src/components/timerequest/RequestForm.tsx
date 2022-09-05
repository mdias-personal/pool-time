import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { EventProps } from '../../types/Props';
import { addNewAppt, updateAppt } from '../../utils/MiddleEnd';

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
  const [day, setDay] = useState('');
  //  request?.start ? new Date(request.start).toLocaleDateString : ''
  //);
  const [start, setStart] = useState('');
  //  request?.start ? new Date(request.start).toLocaleTimeString : ''
  //);
  const [end, setEnd] = useState('');
  //  request?.end ? new Date(request.end).toLocaleTimeString : ''
  //);

  async function handleSubmit() {
    const args = {
      ownerid: userid,
      start: new Date(day + ' ' + start),
      end: new Date(day + ' ' + end)
    } as EventProps;
    const result = request
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
        <table>
          <tr>
            <td>
              <label htmlFor='day'>Day</label>
            </td>
            <td>
              <input
                type='date'
                id='day'
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
