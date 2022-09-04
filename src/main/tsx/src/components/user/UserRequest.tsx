import React from 'react';
import { Button } from 'react-bootstrap';
import { UNEXPECT_ALERT_TEXT } from '../../types/Constants';
import { UserProps } from '../../types/Props';
import { updateUser, deleteUser } from '../../utils/MiddleEnd';

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
      <td>{request.firstname}</td>
      <td>{request.lastname}</td>
      <td>{request.email}</td>
      <td>{request.phonenumber}</td>
      <td>
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
