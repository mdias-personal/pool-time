import { UserProps } from '../../types/Props';

function RankingPage(user: UserProps): JSX.Element {
  return (
    <>
      <h2 className='page-title'>Score Board</h2>
      <br />
      <br />
      <div>this is where you're going to see a scoreboard with everyone's pool score</div>
      <img className='main-pic' src='/images/construction.gif' />
    </>
  );
}

export default RankingPage;
