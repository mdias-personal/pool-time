export interface UserProps {
  email: String;
  password?: String;
  firstname: String;
  lastname: String;
  phonenumber: String;
  operation?: String;
  admin?: Boolean;
  poolscore?: Number;
  id?: String;
  approved?: Boolean;
}

export interface EventProps {
 date: Date;
 guests: [UserProps];  
}