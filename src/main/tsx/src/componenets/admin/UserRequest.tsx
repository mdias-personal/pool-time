import { UNEXPECT_ALERT_TEXT } from '../../types/Constants';
import { UserProps } from '../../types/Props';
import { updateUser, deleteUser } from '../../utils/MiddleEnd';

export const UserRequest = (props: {request: UserProps, pageReload: Function}) => {
  async function approveUser() {
    props.request.approved = true;
    const result = await updateUser(props.request);
    if (result) {
      alert(`${props.request.firstname} has been successfully approved!`);
    } else {
      alert(UNEXPECT_ALERT_TEXT);
    }
    props.pageReload();
  }
  async function denyUser() {
    const result = await deleteUser(props.request);
    if (result) {
      alert(`${props.request.firstname} has been successfully denied!`);
    } else {
      alert(UNEXPECT_ALERT_TEXT);
    }
    props.pageReload();
  }
  return (
    <>
      <p>{props.request.firstname + ' ' + props.request.lastname + ': ' + props.request.email}</p>
      <input type="button" onClick={denyUser} value={'Deny'} className="deny" />
      <input
        type="button"
        onClick={approveUser}
        value={'Approve'}
        className="approve"
      />
    </>
  );
};
