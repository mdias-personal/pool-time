import { formatNumber } from '../../utils/Misc';

const UserFields: React.FC<{
  newUser: Boolean;
  login: Boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  firstname: string;
  setFirstname: React.Dispatch<React.SetStateAction<string>>;
  lastname: string;
  setLastname: React.Dispatch<React.SetStateAction<string>>;
  phonenumber: string;
  setPhonenumber: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  secondPassword: string;
  setSecondPassword: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  firstname,
  setFirstname,
  newUser,
  login,
  lastname,
  setLastname,
  phonenumber,
  setPhonenumber,
  email,
  setEmail,
  password,
  setPassword,
  secondPassword,
  setSecondPassword
}) => {
  return (
    <>
      <input
        type='email'
        placeholder='email'
        required
        value={email}
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type='password'
        placeholder={newUser || login ? 'password' : 'new password'}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      {(newUser || !login) && (
        <>
          <input
            type='password'
            placeholder={newUser ? 'confirm your password' : 'old password'}
            required
            value={secondPassword}
            onChange={(e) => setSecondPassword(e.target.value)}
          />
          <br />
          <input
            type='text'
            placeholder='first name'
            value={firstname}
            defaultValue={firstname}
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <br />
          <input
            type='text'
            placeholder='last name'
            value={lastname}
            defaultValue={lastname}
            required
            onChange={(e) => setLastname(e.target.value)}
          />
          <br />
          <input
            type='tel'
            placeholder='phone number'
            value={phonenumber}
            defaultValue={phonenumber}
            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            maxLength={13}
            title='use dashes ... 508-821-3222'
            onKeyUp={(e) => setPhonenumber(formatNumber(e.currentTarget.value))}
            onChange={(e) => setPhonenumber(formatNumber(e.currentTarget.value))}
            required
          />
          <br />
        </>
      )}
    </>
  );
};

export default UserFields;
