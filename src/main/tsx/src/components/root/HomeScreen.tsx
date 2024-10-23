import { userInfo } from "os";
import React, { useState } from "react";
import { UserProps } from "../../types/Props";
import EventFeed from "./EventFeed";
import Menu from "./Menu";

function HomeScreen(user: UserProps) {
    const [mainSection, setMainSection] = useState(<EventFeed {...user} />);

    return (
        <div>
            <Menu user={user} setMainSection={setMainSection} />
            <div className="main-section">{mainSection}</div>
        </div>
    );
}

export default HomeScreen;
