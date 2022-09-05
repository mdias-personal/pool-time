import React from 'react';
import { Button } from 'react-bootstrap';
import { UNEXPECT_ALERT_TEXT } from '../../types/Constants';
import { UserProps } from '../../types/Props';
import { updateUser, deleteUser } from '../../utils/MidEnd/UserUtils';

interface UserRequestProps {
  request: UserProps;
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserRequest: React.FC<UserRequestProps> = ({
  request,
  pageReload,
  setPageReload
}: UserRequestProps) => {
  async function approveUser() {
    const result = await updateUser(request, true);
    if (!result) {
      alert(UNEXPECT_ALERT_TEXT);
    }
    setPageReload(!pageReload);
  }
  async function denyUser() {
    const result = await deleteUser(request);
    if (!result) {
      alert(UNEXPECT_ALERT_TEXT);
    }
    setPageReload(!pageReload);
  }
  return (
    <tr>
      <td aria-label='First Name'>{request.firstname}</td>
      <td aria-label='Last Name'>{request.lastname}</td>
      <td aria-label='Email'>{request.email}</td>
      <td aria-label='Phone Number'>{request.phonenumber}</td>
      <td aria-label='Actions'>
        <Button onClick={denyUser} variant='outline-danger'>
          Deny
        </Button>
        <Button onClick={approveUser} variant='outline-success'>
          Approve
        </Button>
      </td>
    </tr>
  );
};

export default UserRequest;
