import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction } from 'react';
import { SelectWithFirst } from '../../../components/SelectWithFirst/SelectWithFirst';
import { getPupilName, IPupilId, ISubjectId, ISumarizationStyle } from '../../../model/__IRecord';

interface RecordsFilterProps {
    pupils: Set<IPupilId>;
    subjects: Set<ISubjectId>;
    pupil: IPupilId | null;
    setPupil: Dispatch<SetStateAction<IPupilId | null>>;
    sumarizationStyle: ISumarizationStyle;
    setSumarizationStyle: Dispatch<SetStateAction<ISumarizationStyle>>;
    subject: ISubjectId | null;
    setSubject: Dispatch<SetStateAction<ISubjectId | null>>;
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
                options={[
                    { id: null, title: 'Celá třída' },
                    ...Array.from(pupils).map((pupilId) => ({
                        id: pupilId,
                        title: getPupilName(pupilId),
                    })),
                ]}
            />
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
            <SelectWithFirst
                title={`Předmět`}
                value={subject}
                onChange={(newSubject) => void setSubject(newSubject)}
                options={[
                    { id: null, title: 'Vše' },
                    ...Array.from(subjects).map((subjectId) => ({
                        id: subjectId,
                        title: t(`subjects.${subjectId}`),
                    })),
                ]}
            />
        </div>
    );
}
