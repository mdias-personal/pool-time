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
    oldPass?: String;
}

export interface EventProps {
    id?: String;
    start: Date;
    end: Date;
    approved: Boolean;
    ownerid: String;
    guests: String[];
    snacks: SnackProps[];
}

export interface SnackProps {
    id?: String;
    name: String;
    type?: String;
}
