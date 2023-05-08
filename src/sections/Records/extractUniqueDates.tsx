import moment, { Moment } from 'moment';
import { IRecord } from '../../model/__IRecord';

function extractUniqueDates(records: IRecord[]): Set<string> {
    const dates: Array<Moment> = [];
    records.forEach((record) => {
        dates.push(moment(record.lessonDate));
    });

    // Note: Sort dates from newest to oldest
    const uniqueDates = new Set(
        dates.sort((date1, date2) => date2.diff(date1)).map((date) => date.format('YYYY/MM/DD')),
    );

    return uniqueDates;
}

/**
 * TODO: !!! Maybe remove - no used
 */
