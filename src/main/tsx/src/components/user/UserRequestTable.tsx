import { UserProps } from '../../types/Props';
import UserRequest from './UserRequest';

interface UserRequestTableProps {
  requests: UserProps[];
  pageReload: boolean;
  setPageReload: React.Dispatch<React.SetStateAction<boolean>>;
  admin: boolean;
}
const TimeRequestTable: React.FC<UserRequestTableProps> = ({
  requests,
  pageReload,
  setPageReload,
  admin
}: UserRequestTableProps) => {
  return (
    <table>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Actions</th>
      </tr>
      {requests.map((request) => {
        return (
          <UserRequest
            request={request}
            pageReload={pageReload}
            setPageReload={setPageReload}
          />
        );
      })}
    </table>
  );
};

export default TimeRequestTable;
