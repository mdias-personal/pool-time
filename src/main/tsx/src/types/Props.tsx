export interface UserProps {
  email: String;
  password?: String;
  firstname: String;
  lastname: String;
  phonenumber: String;
  admin?: Boolean;
  poolscore?: Number;
  id?: String;
  approved?: Boolean;
}

export interface EventProps {
  id?: String;
  start: Date;
  end: Date;
  approved: Boolean;
  ownerid: String;
  guests: String[];
}
