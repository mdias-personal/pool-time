import { userInfo } from "os";
import React, { useState } from "react";
import { UserProps } from "../../types/Props";

export function UserPage(props: {
  login: boolean;
  submitFunc: Function;
}): JSX.Element {
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const signupfields: JSX.Element = (
    <>
      <input type="password" placeholder="confirm your password" />
      <br />
    </>
  );
  const editFields: JSX.Element = (
    <>
      <input
        type="text"
        placeholder="first name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="last name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <br />
      <input
        type="tel"
        placeholder="phone number"
        value={phonenumber}
        pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
        onChange={(e) => setPhonenumber(e.target.value)}
      />
      <br />
    </>
  );
  const nonEditFields: JSX.Element = (
    <>
      <a onClick={() => setNewUser(!newUser)}>
        {newUser ? "Use an existing account" : "Create a new account"}
      </a>
      <br />
    </>
  );

  const handleSubmit = () => {
    console.log('button hit');
    const args: UserProps = {
      email: email,
      phonenumber: phonenumber,
      password: password,
      firstname: firstname,
      lastname: lastname,
      operation: newUser ? "add" : props.login ? "login" : "edit",
    };
    props.submitFunc(args);
  };

  return (
    <>
      <input
        type="email"
        placeholder="email"
        className="required"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {newUser ? signupfields : null}
      {newUser || !props.login ? editFields : null}
      {props.login ? nonEditFields : null}
      <input
        type="submit"
        onClick={() => handleSubmit()}
        value={newUser ? "Sign up" : props.login ? "Log in" : "Update info"}
      />
    </>
  );
}
