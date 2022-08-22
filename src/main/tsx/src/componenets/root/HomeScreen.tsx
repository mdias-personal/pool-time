import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import Menu from "./Menu";

function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
          setUsers(data.map((user: {fname: String}) => {
            return user.fname;
          }))
      });
  }, []);
  return (
    <div>
      <h2>welcome to the pool website!</h2>
      <Menu setShowToast={setShowToast} />
      <div>
        <p>users</p>
        <ul>
          {users.map((user) => {
            return <li>{user}</li>;
          })}
        </ul>
      </div>
      {showToast ? (
        <Toast onClose={() => setShowToast(false)} autohide={true}>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      ) : null}
    </div>
  );
}

export default HomeScreen;