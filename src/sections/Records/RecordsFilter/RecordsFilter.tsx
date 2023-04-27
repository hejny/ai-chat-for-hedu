import { Dispatch, SetStateAction } from 'react';
import { SelectWithFirst } from '../../../components/SelectWithFirst/SelectWithFirst';
import { IPupilId, ISubjectId, ISumarizationStyle } from '../../../model/__IRecord';

interface RecordsFilterProps {
    pupil: IPupilId | null;
    setPupil: Dispatch<SetStateAction<IPupilId | null>>;
    sumarizationStyle: ISumarizationStyle;
    setSumarizationStyle: Dispatch<SetStateAction<ISumarizationStyle>>;
    subject: ISubjectId | null;
    setSubject: Dispatch<SetStateAction<ISubjectId | null>>;
}

export function RecordsFilter(props: RecordsFilterProps) {
    const { pupil, setPupil, sumarizationStyle, setSumarizationStyle, subject, setSubject } = props;

    return (
        <div>
            Filters
            <SelectWithFirst
                title={`Deník`}
                value={pupil}
                onChange={(newPerson) => void setPupil(newPerson)}
                options={[
                    { id: null, title: `Můj` },
                    { id: 1, title: `Franta Opička` },
                    { id: 2, title: `Jana Havlíčková` },
                    { id: 3, title: `Marie Němcová` },
                    { id: 4, title: `Jiří Kratochvíl` },
                    { id: 5, title: `Kateřina Kšírová` },
                    { id: 6, title: `Josef Urban` },
                    { id: 7, title: `Josef Červenka` },
                ]}
            />
            <SelectWithFirst
                title={``}
                value={sumarizationStyle}
                onChange={(newSumarizationStyle) => void setSumarizationStyle(newSumarizationStyle)}
                numberOfButtons={2}
                options={[
                    { id: 'SUMMARIZE' as ISumarizationStyle, title: `Sumarizace` },
                    { id: 'FULL' as ISumarizationStyle, title: `Podrobně` },
                ]}
            />
            <SelectWithFirst
                title={`Předmět`}
                value={subject}
                onChange={(newSubject) => void setSubject(newSubject)}
                options={[
                    { id: null, title: `Vše` },
                    { id: 'MATH', title: `Matematika` },
                    { id: 'FOCANS', title: `Prvouka` },
                    { id: 'CZECH_LANGUAGE', title: `Český jazyk` },
                    { id: 'ENGLISH_LANGUAGE', title: `Anglický jazyk` },
                ]}
            />
        </div>
    );
}
