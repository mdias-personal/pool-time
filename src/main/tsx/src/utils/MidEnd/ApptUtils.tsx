import { UNEXPECT_ALERT_TEXT } from '../../types/Constants';
import { EventProps } from '../../types/Props';

export function convertApptFromBackToFront(appt: any): EventProps {
  return {
    id: appt.id,
    approved: appt.approved,
    start: appt.start,
    end: appt.end,
    ownerid: appt.ownerid,
    guests: appt.guests
  } as EventProps;
}

export async function addNewAppt(args: EventProps) {
  return fetch(`/appts/${args.ownerid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start: args.start,
      end: args.end,
      guests: args.guests
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}

export async function deleteAppt(apptid: String) {
  return fetch(`/appts/${apptid}`, {
    method: 'DELETE'
  })
    .then((response) => response.ok)
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}

export async function updateAppt(args: EventProps, action: String) {
  return fetch(`/appts/${args.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start: args.start,
      end: args.end,
      approved: args.approved,
      guests: args.guests,
      actionAlert: action
    })
  })
    .then((response) => response.ok)
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}
