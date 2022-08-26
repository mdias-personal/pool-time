import { UserProps } from "../../types/Props";

function RequestPage(user: UserProps): JSX.Element {
  return (
    <>
      <h2>welcome to the pool website {user.firstname}!</h2>
      <div>this is where you're going to schedule requests</div>
    </>
  );
}

export default RequestPage;