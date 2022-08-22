import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { UserProps } from "../../types/Props";
import { addNewUser, loginUser} from "../../utils/MiddleEnd";
import { UserPage } from "../user/UserPage";
import HomeScreen from "./HomeScreen";

function App(): JSX.Element {
  const [showToast, setShowToast] = useState(false);

  async function loginOrSignup (args: UserProps) {
    console.log(args);
    if (args.operation === "add") {
      addNewUser(args);
    }
    else if (args.operation === 'login') {
      const result = await loginUser(args);
      if (typeof result !== 'string'){
        setPage(<HomeScreen/>)
      }
      else {
        alert(result);
      }
      console.log('in app.tsx')
      console.log(result);
    }
  };

  const [page, setPage] = useState(
    <UserPage login={true} submitFunc={loginOrSignup} />
  );
  return (
    <>
      {page}
      {showToast ? (
        <Toast onClose={() => setShowToast(false)} autohide={true}>
          <Toast.Body>Hey! thanks for signing up, your application is being reviewed by Lou!</Toast.Body>
        </Toast>
      ) : null}
    </>
  );
}

export default App;
