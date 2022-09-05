import { EventProps } from '../../types/Props';
import { compareStartDates } from '../../utils/Misc';
import TimeRequest from './TimeRequest';

interface TimeRequestTableProps {
  requests: EventProps[];
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
  admin: boolean;
  displayNames: { [id: string]: string };
}
const TimeRequestTable: React.FC<TimeRequestTableProps> = ({
  requests,
  pageReload,
  setPageReload,
  admin,
  displayNames
}: TimeRequestTableProps) => {
  return (
    <table>
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
            />
          );
        })}
    </table>
  );
};

export default TimeRequestTable;
