import { NextApiRequest, NextApiResponse } from 'next';
import { serializeRecord } from '../../model/__IRecord';
import { getRecords, updateRecord } from './utils/getRecords';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        return response.status(200).json({ records: (await getRecords()).map(serializeRecord) });
    } else if (request.method === 'PUT') {
        console.log(`Updating record`);
        try {
            const newRecord = request.body.record;

            if (!newRecord) {
                throw new Error('No record');
            }

            await updateRecord(newRecord);

            return response.status(200).json({ message: 'Record saved successfully' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Failed to save records' });
        }
    } else {
        return response.status(405).json({ message: 'Method not allowed' });
    }
}
