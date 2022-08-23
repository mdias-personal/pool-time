import { UNEXPECT_ALERT_TEXT } from "../types/Constants";
import { UserProps } from "../types/Props";

export async function addNewUser(args: UserProps) {
  return fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fname: args.firstname,
      lname: args.lastname,
      email: args.email,
      pnumber: args.phonenumber,
      pword: args.password,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}
export async function loginUser(args: UserProps) {
  return fetch(`/users/login?email=${args.email}&password=${args.password}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      alert(UNEXPECT_ALERT_TEXT);
    });
}
