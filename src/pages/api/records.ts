import { NextApiRequest, NextApiResponse } from 'next';
import { MOCKED_RECORDS } from '../../mocks/records';
import { IRecord } from '../../model/__IRecord';

let records: Array<IRecord>;

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (!records) {
        console.log(`Creating new records`);
        records = MOCKED_RECORDS;
    }

    if (request.method === 'GET') {
        return response.status(200).json({ records });
    } else if (request.method === 'PUT') {
        console.log(`Updating record`);
        try {
            const newRecord = request.body.record;

            if (!newRecord) {
                throw new Error('No record');
            }

            const oldRecord = records.find((record) => record.id === newRecord.id);

            if (!oldRecord) {
                throw new Error(`No existing record with id "${newRecord.id}"`);
            }

            const index = records.indexOf(oldRecord);
            records[index] = { ...oldRecord, ...newRecord };

            return response.status(200).json({ message: 'Record saved successfully' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Failed to save records' });
        }
    } else {
        return response.status(405).json({ message: 'Method not allowed' });
    }
}
