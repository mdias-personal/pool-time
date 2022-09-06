import { UserProps } from '../../types/Props';
import FramedImg from '../common/FramedImg';

function EventFeed(user: UserProps): JSX.Element {
  return (
    <>
      <h2 className='page-title'>Events</h2>
      <br />
      <br />
      <FramedImg src='/images/lou.jpg' title='Lou' />
    </>
  );
}

export default EventFeed;
