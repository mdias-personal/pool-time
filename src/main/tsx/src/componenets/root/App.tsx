import React, { useEffect, useState } from "react";
import Menu from "./Menu";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/user")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div>
      <h2>welcome to the pool website!</h2>
      <Menu/>
      <div>
        <p>users</p>
        <ul>
          {users.map((user) => {
            return <li>{user}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
