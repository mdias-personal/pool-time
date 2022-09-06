import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { EventProps } from '../../types/Props';
import { addNewAppt, updateAppt } from '../../utils/MidEnd/ApptUtils';
import { getDateFromAppt, getGuestsFromAppt, getTimeFromAppt } from '../../utils/Misc';
import Select from 'react-select';

interface RequestFormProps {
  userid: String;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
  request?: EventProps;
  displayNames: { [id: string]: string };
}
const RequestForm: React.FC<RequestFormProps> = ({
  userid,
  showModal,
  setShowModal,
  pageReload,
  setPageReload,
  request,
  displayNames
}: RequestFormProps) => {
  const [day, setDay] = useState(getDateFromAppt(request));
  const [start, setStart] = useState(getTimeFromAppt(true, request));
  const [end, setEnd] = useState(getTimeFromAppt(false, request));
  const [guests, setGuests] = useState<string[]>(getGuestsFromAppt(request));

  async function handleSubmit() {
    const args = {
      ownerid: userid,
      start: new Date(day + ' ' + start),
      end: new Date(day + ' ' + end),
      guests: guests,
      approved: false
    } as EventProps;
    typeof request !== 'undefined'
      ? await updateAppt({ ...args, id: request.id }, 'EDIT')
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
              <label htmlFor='end'>End</label>
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
          <tr>
            <td>
              <label htmlFor='guests'>Guests</label>
            </td>
            <td>
              <Select
                options={Object.entries(displayNames)
                  .map((e) => ({
                    value: e[0],
                    label: e[1]
                  }))
                  .sort((a, b) => a.label.localeCompare(b.label))}
                closeMenuOnSelect={false}
                isMulti
                defaultValue={guests.map((guest) => ({
                  value: guest,
                  label: displayNames[guest]
                }))}
                onChange={(values) => setGuests(values.map((e) => e.value))}
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
