import { IRecord } from '../../model/__IRecord';
import { useFetchData } from './useFetchData';

export function useFetchRecords(): Array<IRecord> {
    const data = useFetchData<{ records: Array<IRecord> }>('/api/records');

    if (data === null) {
        return [];
    }

    return data.records.map((record) => ({
        ...record,
        lessonDate: new Date(record.lessonDate),
    }));
}
