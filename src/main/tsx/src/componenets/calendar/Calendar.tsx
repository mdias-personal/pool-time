
import { UserProps } from "../../types/Props";

function CalendarPage(user: UserProps): JSX.Element {
  return (
    <>
      <h2>welcome to the pool website {user.firstname}!</h2>
      <div>this is where you're going to see a calendar view of the current week's requests</div>
    </>
  );
}

export default CalendarPage;