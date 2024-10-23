import { EventProps, UserProps } from "../../types/Props";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { convertApptFromBackToFront } from "../../utils/MidEnd/ApptUtils";

function CalendarPage(user: UserProps): JSX.Element {
    const [events, setEvents] = useState<EventProps[]>([]);
    const [pageReload, setPageReload] = useState(true);

    useEffect(() => {
        fetch("/appts")
            .then((response) => response.json())
            .then((data) => {
                setEvents(
                    data.map((appt: any) => convertApptFromBackToFront(appt)),
                );
            });
    }, [pageReload]);

    const calEvents = events.map((event) => {
        return {
            id: event.id?.toString() || "id",
            title: event.guests.length + 1 + " guests",
            start: event.start,
            end: event.end,
            color: event.approved ? "blue" : "orange",
        };
    });
    return (
        <FullCalendar
            navLinks={false}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={calEvents}
            aspectRatio={1.35}
            eventClick={() => {
                alert("event clicked");
            }}
        />
    );
}
export default CalendarPage;
