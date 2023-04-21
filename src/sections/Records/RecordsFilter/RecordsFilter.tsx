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
                options={[
                    { id: 0, title: `Můj` },
                    { id: 1, title: `Franta Opička` },
                    { id: 2, title: `Jana Havlíčková` },
                    { id: 3, title: `Marie Němcová` },
                    { id: 4, title: `Jiří Kratochvíl` },
                    { id: 5, title: `Kateřina Kšírová` },
                    { id: 6, title: `Josef Urban` },
                    { id: 7, title: `Josef Červenka` },
                ]}
            />
        </div>
    );
}
