import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { UserProps } from '../../types/Props';
import { formatNumber } from '../../utils/Misc';

export const UserPage = (props: {
  login: boolean;
  submitFunc: Function;
}): JSX.Element => {
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const args: UserProps = {
      email: email,
      phonenumber: phonenumber.replaceAll('-', ''),
      password: password,
      firstname: firstname,
      lastname: lastname
    };
    props.submitFunc(args, newUser ? 'add' : props.login ? 'login' : 'edit');
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type='email'
        placeholder='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type='password'
        placeholder='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {newUser ? (
        <input type='password' placeholder='confirm your password' required />
      ) : null}
      {newUser || !props.login ? (
        <>
          <input
            type='text'
            placeholder='first name'
            value={firstname}
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <br />
          <input
            type='text'
            placeholder='last name'
            value={lastname}
            required
            onChange={(e) => setLastname(e.target.value)}
          />
          <br />
          <input
            type='tel'
            placeholder='phone number'
            value={phonenumber}
            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            maxLength={13}
            title='use dashes ... 508-821-3222'
            onKeyUp={(e) => setPhonenumber(formatNumber(e.currentTarget.value))}
            onChange={(e) => setPhonenumber(formatNumber(e.currentTarget.value))}
            required
          />
          <br />
        </>
      ) : null}
      <Button type='submit'>
        {newUser ? 'Sign up' : props.login ? 'Log in' : 'Update info'}
      </Button>
      {props.login ? (
        <Button variant='secondary' onClick={() => setNewUser(!newUser)}>
          {newUser ? 'Existing user?' : 'Sign up'}
        </Button>
      ) : null}
    </form>
  );
};
