import { useState } from 'react';
import { SelectWithFirst } from '../../../components/SelectWithFirst/SelectWithFirst';

interface RecordsFilterProps {}

export function RecordsFilter(props: RecordsFilterProps) {
    const {} = props;

    const [person, setPerson] = useState(0);

    return (
        <div>
            Filters
            <SelectWithFirst
                title={`Deník`}
                value={person}
                onChange={(newPerson) => void setPerson(newPerson)}
                options={{
                    0: `Můj`,
                    1: `Franta Opička`,
                }}
            />
        </div>
    );
}
