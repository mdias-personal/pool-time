import { EventProps, SnackProps } from "../../types/Props";
import { compareStartDates } from "../../utils/Misc";
import TimeRequest from "./TimeRequest";

interface TimeRequestTableProps {
    requests: EventProps[];
    pageReload: boolean;
    setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
    admin: boolean;
    displayNames: { [id: string]: string };
    allSnacks: SnackProps[];
}
const TimeRequestTable: React.FC<TimeRequestTableProps> = ({
    requests,
    pageReload,
    setPageReload,
    admin,
    displayNames,
    allSnacks,
}: TimeRequestTableProps) => {
    return (
        <table className="basic">
            <thead>
                <th>Day</th>
                <th>Start</th>
                <th>End</th>
                <th>Guests</th>
                <th>Snacks</th>
                <th>Status</th>
                <th>Actions</th>
            </thead>
            {requests
                .sort((a, b) => compareStartDates(a, b))
                .map((request) => {
                    return (
                        <TimeRequest
                            request={request}
                            pageReload={pageReload}
                            setPageReload={setPageReload}
                            admin={admin}
                            displayNames={displayNames}
                            allSnacks={allSnacks}
                        />
                    );
                })}
        </table>
    );
};

export default TimeRequestTable;
