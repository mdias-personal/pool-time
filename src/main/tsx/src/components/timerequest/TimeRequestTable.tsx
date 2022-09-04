import { EventProps } from '../../types/Props';
import TimeRequest from './TimeRequest';

interface TimeRequestTableProps {
  requests: EventProps[];
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
  admin: boolean;
}
const TimeRequestTable: React.FC<TimeRequestTableProps> = ({
  requests,
  pageReload,
  setPageReload,
  admin
}: TimeRequestTableProps) => {
  return (
    <table>
      <thead>
        <th>Day</th>
        <th>Start</th>
        <th>End</th>
        <th>Guests</th>
        <th>Status</th>
        <th>Actions</th>
      </thead>
      {requests.map((request) => {
        return (
          <TimeRequest
            request={request}
            pageReload={pageReload}
            setPageReload={setPageReload}
            admin={admin}
          />
        );
      })}
    </table>
  );
};

export default TimeRequestTable;
