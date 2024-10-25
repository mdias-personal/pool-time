import { useEffect, useState } from "react";
import { EventProps, SnackProps, UserProps } from "../../types/Props";
import { Button } from "react-bootstrap";
import RequestForm from "./RequestForm/RequestForm";
import TimeRequestTable from "./TimeRequestTable";
import { convertApptFromBackToFront } from "../../utils/MidEnd/ApptUtils";
import { BsCalendarPlus } from "react-icons/bs";

const RequestPage: React.FC<UserProps> = (user: UserProps) => {
    const [timeRequests, setTimeRequests] = useState<EventProps[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [pageReload, setPageReload] = useState(false);
    const [displayNames, setDisplayNames] = useState<{ [id: string]: string }>(
        {},
    );
    const [snacks, setSnacks] = useState<SnackProps[]>([]);

    useEffect(() => {
        fetch(`/appts/${user.id}`)
            .then((response) => response.json())
            .then((data) => {
                setTimeRequests(
                    data.map((appt: any) => convertApptFromBackToFront(appt)),
                );
            });
        fetch("/users/names")
            .then((response) => response.json())
            .then((data) => {
                setDisplayNames(data);
            });
        fetch("/snacks")
            .then((response) => response.json())
            .then((data) => {
                setSnacks(data);
            });
    }, [pageReload]);
    return (
        <>
            <h2 className="page-title">{user.firstname}'s Time Requests</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                {"New Request "}
                <BsCalendarPlus />
            </Button>
            <br />
            <br />
            <TimeRequestTable
                requests={timeRequests}
                pageReload={pageReload}
                setPageReload={setPageReload}
                admin={false}
                displayNames={displayNames}
                allSnacks={snacks}
            />
            <RequestForm
                userid={user.id || ""}
                showModal={showModal}
                setShowModal={setShowModal}
                pageReload={pageReload}
                setPageReload={setPageReload}
                displayNames={displayNames}
                allSnacks={snacks}
            />
        </>
    );
};

export default RequestPage;
