import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { EventProps } from '../../types/Props';
import { addNewAppt } from '../../utils/MiddleEnd';

interface NewRequestProps {
  userid: String;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewRequest: React.FC<NewRequestProps> = ({
  userid,
  showModal,
  setShowModal,
  pageReload,
  setPageReload
}: NewRequestProps) => {
  const [day, setDay] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  async function handleSubmit() {
    const result = await addNewAppt({
      ownerid: userid,
      start: new Date(day + ' ' + start),
      end: new Date(day + ' ' + end)
    } as EventProps);
    console.log(result);
    setShowModal(false);
    setPageReload(!pageReload);
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>New Time Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor='day'>Day</label>
        <input
          type='date'
          id='day'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <br />
        <label htmlFor='start'>start</label>
        <input
          type='time'
          id='start'
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <br />
        <label htmlFor='end'>end</label>
        <input
          type='time'
          id='end'
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => handleSubmit()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default NewRequest;
