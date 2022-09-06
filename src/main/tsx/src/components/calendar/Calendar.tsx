import { UserProps } from '../../types/Props';

function CalendarPage(user: UserProps): JSX.Element {
  return (
    <>
      <h2 className='page-title'>Calendar</h2>
      <br />
      <br />
      <div>
        this is where you're going to see a calendar view of the current week's requests
      </div>
      <img className='main-pic' src='/images/construction.gif' />
    </>
  );
}

export default CalendarPage;
