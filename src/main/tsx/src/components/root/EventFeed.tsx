import { UserProps } from '../../types/Props';

function EventFeed(user: UserProps): JSX.Element {
  return (
    <>
      <h2>welcome to the pool website {user.firstname}!</h2>
      <img className='main-pic' src='/images/lou.jpg' />
    </>
  );
}

export default EventFeed;