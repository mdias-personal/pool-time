import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { EventProps, SnackProps } from '../../../types/Props';
import { addNewAppt, updateAppt } from '../../../utils/MidEnd/ApptUtils';
import {
  getDateFromAppt,
  getGuestsFromAppt,
  getTimeFromAppt,
  getSnacksFromAppt
} from '../../../utils/Misc';
import DateSelect from './DateSelect';
import GuestSelect from './GuestSelect';
import SnackSelect from './SnackSelect';
import TimeSelect from './TimeSelect';

interface RequestFormProps {
  userid: String;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
  request?: EventProps;
  displayNames: { [id: string]: string };
  allSnacks: SnackProps[];
}
const RequestForm: React.FC<RequestFormProps> = ({
  userid,
  showModal,
  setShowModal,
  pageReload,
  setPageReload,
  request,
  displayNames,
  allSnacks
}: RequestFormProps) => {
  const [day, setDay] = useState(getDateFromAppt(request));
  const [start, setStart] = useState(getTimeFromAppt(true, request));
  const [end, setEnd] = useState(getTimeFromAppt(false, request));
  const [guests, setGuests] = useState<string[]>(getGuestsFromAppt(request));
  const [snacks, setSnacks] = useState<SnackProps[]>(getSnacksFromAppt(request));
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const args = {
      ownerid: userid,
      start: new Date(day + ' ' + start),
      end: new Date(day + ' ' + end),
      guests: guests,
      approved: false,
      snacks: snacks
    } as EventProps;
    typeof request !== 'undefined'
      ? await updateAppt({ ...args, id: request.id }, 'EDIT')
      : await addNewAppt(args);
    setLoading(false);
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
          <DateSelect label='Day' date={day} setDate={setDay} />
          <TimeSelect label='Start' time={start} setTime={setStart} />
          <TimeSelect label='End' time={end} setTime={setEnd} />
          <GuestSelect
            guests={guests}
            setGuests={setGuests}
            displayNames={displayNames}
          />
          <SnackSelect snacks={snacks} setSnacks={setSnacks} allSnacks={allSnacks} />
        </table>
      </Modal.Body>
      <Modal.Footer>
        {loading && <Spinner animation={'border'} variant='secondary' />}
        <Button variant='primary' onClick={() => handleSubmit()} disabled={loading}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default RequestForm;
