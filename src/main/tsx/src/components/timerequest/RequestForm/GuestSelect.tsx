import React from 'react';
import Select from 'react-select';

interface GuestSelectProps {
  displayNames: { [id: string]: string };
  guests: string[];
  setGuests: React.Dispatch<React.SetStateAction<string[]>>;
}
const GuestSelect: React.FC<GuestSelectProps> = ({
  displayNames,
  guests,
  setGuests
}: GuestSelectProps) => {
  return (
    <tr>
      <td>
        <label htmlFor='guests'>Guests</label>
      </td>
      <td>
        <Select
          options={Object.entries(displayNames)
            .map((e) => ({
              value: e[0],
              label: e[1]
            }))
            .sort((a, b) => a.label.localeCompare(b.label))}
          closeMenuOnSelect={false}
          isMulti
          defaultValue={guests.map((guest) => ({
            value: guest,
            label: displayNames[guest]
          }))}
          onChange={(values) => setGuests(values.map((e) => e.value))}
        />
      </td>
    </tr>
  );
};
export default GuestSelect;
