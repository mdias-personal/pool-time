import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { UNEXPECT_ALERT_TEXT } from "../../types/Constants";
import { EventProps, SnackProps } from "../../types/Props";
import { deleteAppt, updateAppt } from "../../utils/MidEnd/ApptUtils";
import PopoverTableData from "../common/PopoverTableData";
import RequestForm from "./RequestForm/RequestForm";
import {
    BsCalendarMinus,
    BsCalendar2X,
    BsCalendar2Check,
} from "react-icons/bs";

interface TimeRequestProps {
    request: EventProps;
    pageReload: boolean;
    setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
    admin: boolean;
    displayNames: { [id: string]: string };
    allSnacks: SnackProps[];
}
const TimeRequest: React.FC<TimeRequestProps> = ({
    request,
    pageReload,
    setPageReload,
    admin,
    displayNames,
    allSnacks,
}: TimeRequestProps) => {
    const [showFormModal, setFormShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    async function cancelRequest() {
        setLoading(true);
        const result = await deleteAppt(request.id || "");
        if (!result) {
            alert(UNEXPECT_ALERT_TEXT);
        }
        setLoading(false);
        setPageReload(!pageReload);
    }
    async function approveRequest() {
        setLoading(true);
        request.approved = true;
        const result = await updateAppt(request, "APPROVE");
        if (!result) {
            alert(UNEXPECT_ALERT_TEXT);
        }
        setLoading(false);
        setPageReload(!pageReload);
    }

    const snackStrings = request.snacks.map((snack) => snack.name.toString());
    const guestStrings = request.guests.map(
        (guest) => displayNames[guest.toString()],
    );
    guestStrings.push(displayNames[request.ownerid.toString()]);
    return (
        <tr>
            <td aria-label="Day">
                {new Date(request.start).toLocaleDateString()}
            </td>
            <td aria-label="Start">
                {new Date(request.start).toLocaleTimeString()}
            </td>
            <td aria-label="End">
                {new Date(request.end).toLocaleTimeString()}
            </td>
            <PopoverTableData title="Guests" items={guestStrings} />
            <PopoverTableData title="Snacks" items={snackStrings} />
            <td aria-label="Status">
                {request.approved ? "approved" : "pending"}
            </td>
            <td aria-label="Actions">
                <Button
                    onClick={cancelRequest}
                    variant="outline-danger"
                    disabled={loading}
                >
                    {admin ? "Deny " : "Cancel "}
                    <BsCalendar2X />
                </Button>
                {admin ? (
                    <Button
                        onClick={approveRequest}
                        variant="outline-success"
                        disabled={loading}
                    >
                        {"Approve "}
                        <BsCalendar2Check />
                    </Button>
                ) : (
                    <>
                        <Button
                            onClick={() => setFormShowModal(true)}
                            variant="outline-primary"
                        >
                            {"Edit "}
                            <BsCalendarMinus />
                        </Button>
                        <RequestForm
                            userid={request.ownerid}
                            showModal={showFormModal}
                            setShowModal={setFormShowModal}
                            pageReload={pageReload}
                            setPageReload={setPageReload}
                            request={request}
                            displayNames={displayNames}
                            allSnacks={allSnacks}
                        />
                    </>
                )}
                {loading && (
                    <Spinner animation={"border"} variant="secondary" />
                )}
            </td>
        </tr>
    );
};

export default TimeRequest;
