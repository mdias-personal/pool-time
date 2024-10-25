import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BAD_RESPONSE } from "../../types/Constants";
import { UserProps } from "../../types/Props";
import { editUser } from "../../utils/MidEnd/UserUtils";
import { formatNumber } from "../../utils/Misc";
import UserFields from "./UserFields";

const UserPage: React.FC<{
    login: boolean;
    submitFunc?: (args: UserProps, operation: string) => Promise<void>;
    user?: UserProps;
}> = ({ login, submitFunc, user }) => {
    const [newUser, setNewUser] = useState(false);
    const [email, setEmail] = useState(
        user == undefined ? "" : user.email.toString(),
    );
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [lastname, setLastname] = useState(
        user == undefined ? "" : user.lastname.toString(),
    );
    const [firstname, setFirstname] = useState(
        user == undefined ? "" : user.firstname.toString(),
    );
    const [phonenumber, setPhonenumber] = useState(
        user == undefined ? "" : formatNumber(user.phonenumber.toString()),
    );

    async function sendInfo(args: UserProps, operation: String) {
        if (operation === "edit") {
            args.id = user?.id;
            const result = await editUser(args);
            if (typeof result === "number" && result === BAD_RESPONSE) {
                alert("incorrect old password provided, info not updated!");
            } else {
                alert("info updated!");
            }
        }
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (newUser && secondPassword !== password) {
            alert("Passwords must match!");
        } else {
            const args: UserProps = {
                email: email,
                phonenumber: phonenumber.replaceAll("-", ""),
                password: password,
                firstname: firstname,
                lastname: lastname,
                oldPass: secondPassword,
            };
            submitFunc !== undefined
                ? submitFunc(args, newUser ? "add" : login ? "login" : "edit")
                : sendInfo(args, "edit");
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <UserFields
                newUser={newUser}
                login={login}
                firstname={firstname}
                setFirstname={setFirstname}
                lastname={lastname}
                setLastname={setLastname}
                email={email}
                setEmail={setEmail}
                phonenumber={phonenumber}
                setPhonenumber={setPhonenumber}
                password={password}
                setPassword={setPassword}
                secondPassword={secondPassword}
                setSecondPassword={setSecondPassword}
            />
            <Button type="submit">
                {newUser ? "Sign up" : login ? "Log in" : "Update info"}
            </Button>
            {login ? (
                <Button
                    variant="secondary"
                    onClick={() => setNewUser(!newUser)}
                >
                    {newUser ? "Existing user?" : "Sign up"}
                </Button>
            ) : null}
        </form>
    );
};

export default UserPage;
