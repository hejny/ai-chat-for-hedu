import { IPupilId, IRecord } from '../../model/__IRecord';

export function extractPupils(records: IRecord[]): Set<IPupilId> {
    const uniquePupils = new Set<IPupilId>();
    records.forEach((record) => {
        if (!record.pupilId) {
            return;
        }
        uniquePupils.add(record.pupilId);
    });
    return uniquePupils;
}
