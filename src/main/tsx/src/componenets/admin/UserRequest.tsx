import { Button } from 'react-bootstrap';
import { UNEXPECT_ALERT_TEXT } from '../../types/Constants';
import { UserProps } from '../../types/Props';
import { updateUser, deleteUser } from '../../utils/MiddleEnd';

export const UserRequest = (props: {
  request: UserProps;
  pageReload: boolean;
  setPageReload: Function;
}) => {
  async function approveUser() {
    props.request.approved = true;
    const result = await updateUser(props.request);
    if (!result) {
      alert(UNEXPECT_ALERT_TEXT);
    }
    props.setPageReload(!props.pageReload);
  }
  async function denyUser() {
    const result = await deleteUser(props.request);
    if (!result) {
      alert(UNEXPECT_ALERT_TEXT);
    }
    props.setPageReload(!props.pageReload);
  }
  return (
    <>
      <p>
        {props.request.firstname +
          ' ' +
          props.request.lastname +
          ': ' +
          props.request.email}
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
