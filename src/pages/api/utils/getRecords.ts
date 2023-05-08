import { MOCKED_RECORDS } from '../../../mocks/records';
import { IRecord } from '../../../model/__IRecord';

let records: Array<IRecord>;

export function getRecords(): Array<IRecord> {
    if (!records) {
        console.log(`Creating new records`);
        records = MOCKED_RECORDS;
    }

    return records;
}

export function updateRecord(newRecord: Partial<IRecord>): void {
    const oldRecord = records.find((record) => record.id === newRecord.id);

    if (!oldRecord) {
        throw new Error(`No existing record with id "${newRecord.id}"`);
    }

    const index = records.indexOf(oldRecord);
    records[index] = { ...oldRecord, ...newRecord };
}
