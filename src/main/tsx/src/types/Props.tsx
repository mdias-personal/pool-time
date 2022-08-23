export interface UserProps {
  email: String;
  password: String;
  firstname: String;
  lastname: String;
  phonenumber: String;
  operation: String;
}

export interface EventProps {
 date: Date;
 guests: [UserProps];  
}