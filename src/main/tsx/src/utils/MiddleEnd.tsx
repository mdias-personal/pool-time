import { UNEXPECT_ALERT_TEXT } from '../types/Constants';
import { EventProps, UserProps } from '../types/Props';

export async function addNewUser(args: UserProps) {
  return fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fname: args.firstname,
      lname: args.lastname,
      email: args.email,
      pnumber: args.phonenumber,
      pword: args.password
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}
export async function loginUser(args: UserProps) {
  return fetch(`/users/login?email=${args.email}&password=${args.password}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}

export function convertUserFromBackToFront(user: any): UserProps {
  return {
    firstname: user.fname,
    lastname: user.lname,
    email: user.email,
    admin: user.admin,
    phonenumber: user.pnumber,
    poolscore: user.poolscore,
    id: user.id,
    approved: user.approved
  } as UserProps;
}

export async function updateUser(user: UserProps, approve?: Boolean) {
  let args = {
    fname: user.firstname,
    lname: user.lastname,
    email: user.email,
    pnumber: user.phonenumber,
    poolscore: user.poolscore
  } as any;
  if (approve) {
    args['approved'] = true;
    args['sendApprovalAlert'] = true;
  }
  return fetch(`/users/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args)
  })
    .then((response) => response.ok)
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}

export async function deleteUser(args: UserProps) {
  return fetch(`/users/${args.id}`, {
    method: 'DELETE'
  })
    .then((response) => response.ok)
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}

export function convertApptFromBackToFront(appt: any): EventProps {
  return {
    id: appt.id,
    approved: appt.approved,
    start: appt.start,
    end: appt.end
  } as EventProps;
}

export async function addNewAppt(args: EventProps) {
  return fetch(`/appts/${args.ownerid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start: args.start,
      end: args.end
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

export async function updateAppt(args: EventProps) {
  return fetch(`/appts/${args.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start: args.start,
      end: args.end,
      approved: args.approved
    })
  })
    .then((response) => response.ok)
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}
