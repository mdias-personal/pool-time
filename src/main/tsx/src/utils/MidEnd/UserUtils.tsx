import { UNEXPECT_ALERT_TEXT } from '../../types/Constants';
import { UserProps } from '../../types/Props';

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
