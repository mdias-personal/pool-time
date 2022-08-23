import { useEffect, useState } from "react";
import { EventProps, UserProps } from "../../types/Props";

export const AdminPage = () => {
  const [timeRequests, setTimeRequests] = useState<[EventProps]>();
  const [userRequests, setUserRequests] = useState<[UserProps]>();
  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        setUserRequests(
          data.map((user: { fname: String }) => {
            return user.fname;
          })
        );
      });
  }, []);
  return <></>;
};
