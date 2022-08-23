import React, { useState } from "react";
import { UserProps } from "../../types/Props";

export const UserPage = (props: {
  login: boolean;
  submitFunc: Function;
}): JSX.Element => {
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const editFields: JSX.Element = (
    <>
      <input
        type="text"
        placeholder="first name"
        value={firstname}
        required
        onChange={(e) => setFirstname(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="last name"
        value={lastname}
        required
        onChange={(e) => setLastname(e.target.value)}
      />
      <br />
      <input
        type="tel"
        placeholder="phone number"
        value={phonenumber}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        maxLength={13}
        title="use dashes ... 508-821-3222"
        required
        onChange={(e) => setPhonenumber(e.target.value)}
      />
      <br />
    </>
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("form submit");
    const args: UserProps = {
      email: email,
      phonenumber: phonenumber.replaceAll("-", ""),
      password: password,
      firstname: firstname,
      lastname: lastname,
      operation: newUser ? "add" : props.login ? "login" : "edit",
    };
    props.submitFunc(args);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="email"
        placeholder="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {newUser ? (
        <input type="password" placeholder="confirm your password" required />
      ) : null}
      {newUser || !props.login ? editFields : null}
      {props.login ? (
        <input
          type="button"
          onClick={() => setNewUser(!newUser)}
          value={newUser ? "Use an existing account" : "Create a new account"}
        />
      ) : null}
      <input
        type="submit"
        value={newUser ? "Sign up" : props.login ? "Log in" : "Update info"}
      />
    </form>
  );
};
