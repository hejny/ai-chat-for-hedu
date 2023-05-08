import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import YAML from 'yaml';
import { MOCKED_RECORDS } from '../../../mocks/records';
import { deserializeRecord, IRecord, IRecordData, serializeRecord } from '../../../model/__IRecord';
import { isFileExisting } from './isFileExisting';

let recordsFilePath = join(process.cwd(), 'data', 'records', 'records.yaml');

export async function getRecords(): Promise<Array<IRecord>> {
    if (!(await isFileExisting(recordsFilePath))) {
        console.log(`Creating new records file`);
        await mkdir(dirname(recordsFilePath), { recursive: true });
        await writeFile(recordsFilePath, YAML.stringify(MOCKED_RECORDS.map(serializeRecord), { indent: 4 }), 'utf8');
    }

    return (YAML.parse(await readFile(recordsFilePath, 'utf8')) as Array<IRecordData>).map(deserializeRecord);
}

export async function updateRecord(newRecord: Partial<IRecord>): Promise<void> {
    const records = await getRecords();

    const oldRecord = records.find((record) => record.id === newRecord.id);

    if (!oldRecord) {
        throw new Error(`No existing record with id "${newRecord.id}"`);
    }

    const index = records.indexOf(oldRecord);
    records[index] = { ...oldRecord, ...newRecord };

    await writeFile(recordsFilePath, YAML.stringify(records.map(serializeRecord), { indent: 4 }), 'utf8');
}
