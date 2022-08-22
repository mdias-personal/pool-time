import { UserProps } from "../types/Props";

export function addNewUser(args: UserProps): void {
  fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fname: args.firstname,
      lname: args.lastname,
      email: args.email,
      pnumber: args.phonenumber,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
export function loginUser(args: UserProps) {
  return fetch(
    `/users/login?email=${args.email}&password=${args.password}`
  )
    .then((response) => {
        if(response.ok) {
            return response.json();
        }
        else {
            if(response.status === 401) {
                return "email/password combo was either not found or was incorrect!";
            }
            else if(response.status === 403) {
                return "correct info, but you haven't been approved by Lou yet!";
            }
        }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
