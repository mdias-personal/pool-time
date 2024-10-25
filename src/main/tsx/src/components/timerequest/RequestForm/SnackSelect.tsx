import React from "react";
import CreatableSelect from "react-select/creatable";
import { SnackProps } from "../../../types/Props";

interface SnackSelectProps {
    allSnacks: SnackProps[];
    snacks: SnackProps[];
    setSnacks: React.Dispatch<React.SetStateAction<SnackProps[]>>;
}
const SnackSelect: React.FC<SnackSelectProps> = ({
    allSnacks,
    snacks,
    setSnacks,
}: SnackSelectProps) => {
    const idmap: { [id: string]: SnackProps } = {};
    allSnacks.forEach((snack) => {
        idmap[snack.id?.toString() || ""] = snack;
    });
    return (
        <tr>
            <td>
                <label htmlFor="snacks">Snacks</label>
            </td>
            <td>
                <CreatableSelect
                    options={allSnacks
                        .map((snack) => ({
                            value:
                                snack.id?.toString() || snack.name.toString(),
                            label: snack.name.toString(),
                        }))
                        .sort((a, b) => a.label.localeCompare(b.label))}
                    closeMenuOnSelect={false}
                    isMulti
                    defaultValue={snacks.map((snack) => ({
                        value: snack.id?.toString() || snack.name.toString(),
                        label: snack.name.toString(),
                    }))}
                    onChange={(values) =>
                        setSnacks(
                            values.map((e) => {
                                let snack = idmap[e.value];
                                if (snack === undefined) {
                                    snack = {
                                        name: e.label,
                                    } as SnackProps;
                                }
                                return snack;
                            }),
                        )
                    }
                />
            </td>
        </tr>
    );
};
export default SnackSelect;
