interface TimeSelectProps {
  label: string;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}
const TimeSelect: React.FC<TimeSelectProps> = ({
  label,
  time,
  setTime
}: TimeSelectProps) => {
  return (
    <tr>
      <td>
        <label htmlFor={'time-' + label}>{label}</label>
      </td>
      <td>
        <input
          type='time'
          id={'time-' + label}
          defaultValue={time}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </td>
    </tr>
  );
};
export default TimeSelect;
