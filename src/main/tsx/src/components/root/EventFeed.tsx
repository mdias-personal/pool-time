import { UserProps } from "../../types/Props";

function EventFeed(user: UserProps): JSX.Element {
  return (
    <>
      <h2>welcome to the pool website {user.firstname}!</h2>
      <div>something is going to need to go here!</div>
    </>
  );
}

export default EventFeed;
