import { UserProps } from "../../types/Props";
import img from '../../siteimages/construction.gif';

function RankingPage(user: UserProps): JSX.Element {
  return (
    <>
      <h2>welcome to the pool website {user.firstname}!</h2>
      <div>this is where you're going to see a scoreboard with everyone's pool score</div>
      <img src={img} />
    </>
  );
}

export default RankingPage;