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

const UserRequest : React.FC<UserRequestProps> = ({request, pageReload, setPageReload}: UserRequestProps) => {
  async function approveUser() {
    request.approved = true;
    const result = await updateUser(request);
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
    <>
      <p>
        {request.firstname +
          ' ' +
          request.lastname +
          ': ' +
          request.email}
      </p>
      <Button onClick={approveUser} variant="outline-success">
        Approve
      </Button>
      <Button onClick={denyUser} variant="outline-danger">
        Deny
      </Button>
    </>
  );
};

export default UserRequest;