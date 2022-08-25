import React, { useState } from "react";
import {
  AWAITING_APPROVAL_RESPONSE,
  BAD_LOGIN_RESPONSE,
} from "../../types/Constants";
import { UserProps } from "../../types/Props";
import {
  addNewUser,
  convertUserFromBackToFront,
  loginUser,
} from "../../utils/MiddleEnd";
import { UserPage } from "../user/UserPage";
import { WaitingApproval } from "../user/WaitingApproval";
import HomeScreen from "./HomeScreen";

function App(): JSX.Element {
  async function loginOrSignup(args: UserProps) {
    if (args.operation === "add") {
      const result = await addNewUser(args);
      if (typeof result !== "string") {
        const message = `thanks for signing up ${result.fname}! your application is being reviewed by Lou!`;
        setPage(<WaitingApproval message={message} />);
      }
    } else if (args.operation === "login") {
      const result = await loginUser(args);
      if (typeof result !== "number") {
        setPage(<HomeScreen {...convertUserFromBackToFront(result)} />);
      } else {
        if (result === AWAITING_APPROVAL_RESPONSE) {
          setPage(<WaitingApproval message="successful login attempt!" />);
        } else if (result === BAD_LOGIN_RESPONSE) {
          alert("email/password combo was either not found or was incorrect!");
        }
      }
    }
  }

  const [page, setPage] = useState(
    <UserPage login={true} submitFunc={loginOrSignup} />
  );

  return (
    <>
      <div className="banner">
        <h1>PoolTime</h1>
      </div>
      {page}
    </>
  );
}

export default App;
