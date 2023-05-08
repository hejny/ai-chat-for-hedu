import { NextApiRequest, NextApiResponse } from 'next';
import { MOCKED_RECORDS } from '../../mocks/records';
import { IRecord } from '../../model/__IRecord';

let records: Array<IRecord>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!records) {
        records = MOCKED_RECORDS;
    }

    if (req.method === 'GET') {
        res.status(200).json({ records });
    } else if (req.method === 'PUT') {
        try {
            const newRecord = req.body.record;

            if (!newRecord) {
                throw new Error('No record');
            }

            const oldRecord = records.find((record) => record.id === newRecord.id);

            if (!oldRecord) {
                throw new Error(`No existing record with id "${newRecord.id}"`);
            }

            const index = records.indexOf(oldRecord);
            records[index] = newRecord;

            res.status(200).json({ message: 'Records saved successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to save records' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
