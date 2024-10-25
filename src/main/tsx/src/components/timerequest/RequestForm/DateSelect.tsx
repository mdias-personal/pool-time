interface DateSelectProps {
    label: string;
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
}
const DateSelect: React.FC<DateSelectProps> = ({
    label,
    date,
    setDate,
}: DateSelectProps) => {
    return (
        <tr>
            <td>
                <label htmlFor={"date-" + label}>{label}</label>
            </td>
            <td>
                <input
                    type="date"
                    id={"date-" + label}
                    defaultValue={date}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </td>
        </tr>
    );
};
export default DateSelect;
