import { deserializeRecord, IRecord, IRecordData } from '../../model/__IRecord';
import { useFetchData } from './useFetchData';

export function useFetchRecords(): Array<IRecord> {
    const data = useFetchData<{ records: Array<IRecordData> }>('/api/records');

    if (data === null) {
        return [];
    }

    return data.records.map(deserializeRecord);
}
