import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction } from 'react';
import { SelectWithFirst } from '../../../components/SelectWithFirst/SelectWithFirst';
import { getPupilName, getSubjectName, IPupilId, ISubjectId, ISumarizationStyle } from '../../../model/__IRecord';

interface RecordsFilterProps {
    pupils: Set<IPupilId>;
    subjects: Set<ISubjectId>;
    pupil: IPupilId | null | undefined;
    setPupil: Dispatch<SetStateAction<IPupilId | null | undefined>>;
    sumarizationStyle: ISumarizationStyle;
    setSumarizationStyle: Dispatch<SetStateAction<ISumarizationStyle>>;
    subject: ISubjectId /*| null*/ | undefined;
    setSubject: Dispatch<SetStateAction<ISubjectId /*| null*/ | undefined>>;
}

export function RecordsFilter(props: RecordsFilterProps) {
    const { pupils, subjects, pupil, setPupil, sumarizationStyle, setSumarizationStyle, subject, setSubject } = props;

    const { t } = useTranslation();

    return (
        <div>
            Filters
            <SelectWithFirst
                title={`Deník`}
                value={pupil}
                onChange={(newPerson) => void setPupil(newPerson)}
                numberOfButtons={2}
                options={[
                    { id: null, title: 'Pouze celá třída' },
                    { id: undefined, title: 'Celá třída a všichni žáci' },
                    ...Array.from(pupils).map((pupilId) => ({
                        id: pupilId,
                        title: getPupilName(pupilId),
                    })),
                ]}
            />
            {/*
            <SelectWithFirst
                title={`Styl`}
                value={sumarizationStyle}
                onChange={(newSumarizationStyle) => void setSumarizationStyle(newSumarizationStyle)}
                numberOfButtons={2}
                options={[
                    { id: 'SUMMARIZE' as ISumarizationStyle, title: `Sumarizace` },
                    { id: 'FULL' as ISumarizationStyle, title: `Podrobně` },
                ]}
            />
            */}
            <SelectWithFirst
                title={`Předmět`}
                value={subject}
                onChange={(newSubject) => void setSubject(newSubject)}
                options={[
                    { id: undefined, title: 'Všechny předměty' },
                    ...Array.from(subjects).map((subjectId) => ({
                        id: subjectId,
                        title: getSubjectName(subjectId),
                    })),
                ]}
            />
        </div>
    );
}
